#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if docker compose version >/dev/null 2>&1; then
    COMPOSE_CMD=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
    COMPOSE_CMD=(docker-compose)
else
    echo "ERREUR: docker compose n'est pas disponible sur ce serveur."
    exit 1
fi

REACT_APP_DIR="${REACT_APP_DIR:-$SCRIPT_DIR}"
REACT_HEALTHCHECK_URL="${REACT_HEALTHCHECK_URL:-http://127.0.0.1:8080/}"
RELOAD_NGINX="${RELOAD_NGINX:-0}"
HEALTHCHECK_INITIAL_DELAY="${HEALTHCHECK_INITIAL_DELAY:-2}"
HEALTHCHECK_RETRIES="${HEALTHCHECK_RETRIES:-20}"
HEALTHCHECK_RETRY_DELAY="${HEALTHCHECK_RETRY_DELAY:-2}"
DOCKER_PRUNE_BEFORE_BUILD="${DOCKER_PRUNE_BEFORE_BUILD:-0}"

echo "===================================="
echo "  Deploiement ultimatebegle.fr"
echo "===================================="
echo ""

find_compose_file() {
    local dir="$1"
    for candidate in docker-compose.yml docker-compose.yaml compose.yml compose.yaml; do
        if [ -f "$dir/$candidate" ]; then
            echo "$candidate"
            return 0
        fi
    done
    return 1
}

run_compose() {
    local dir="$1"
    local compose_file="$2"
    shift 2
    (
        cd "$dir"
        "${COMPOSE_CMD[@]}" -f "$compose_file" "$@"
    )
}

check_http() {
    local name="$1"
    local url="$2"

    if ! command -v curl >/dev/null 2>&1; then
        echo "INFO: curl indisponible, verification HTTP sautee pour $name"
        return 0
    fi

    local attempt=1

    sleep "$HEALTHCHECK_INITIAL_DELAY"

    while [ "$attempt" -le "$HEALTHCHECK_RETRIES" ]; do
        if curl --fail --silent --show-error --location --insecure --max-time 10 "$url" >/dev/null; then
            echo "OK: $name repond sur $url"
            return 0
        fi

        echo "INFO: tentative $attempt/$HEALTHCHECK_RETRIES echouee pour $name ($url), nouvelle tentative dans ${HEALTHCHECK_RETRY_DELAY}s..."
        attempt=$((attempt + 1))
        sleep "$HEALTHCHECK_RETRY_DELAY"
    done

    echo "ERREUR: $name ne repond pas correctement sur $url apres $HEALTHCHECK_RETRIES tentatives"
    exit 1
}

deploy_react_site() {
    local name="ultimatebegle.fr"
    local dir="$REACT_APP_DIR"
    local healthcheck_url="$REACT_HEALTHCHECK_URL"

    if [ ! -d "$dir" ]; then
        echo "ERREUR: dossier du site introuvable ($dir)."
        exit 1
    fi

    local compose_file
    if ! compose_file="$(find_compose_file "$dir")"; then
        echo "INFO: aucun fichier compose trouve pour $name dans $dir, etape ignoree."
        return 0
    fi

    if [ "$DOCKER_PRUNE_BEFORE_BUILD" = "1" ]; then
        echo "[$name] Nettoyage Docker leger avant build..."
        docker builder prune -f >/dev/null 2>&1 || true
        docker image prune -f >/dev/null 2>&1 || true
    fi

    echo "[$name] Build de l'image Docker..."
    run_compose "$dir" "$compose_file" build

    echo "[$name] Demarrage des conteneurs..."
    run_compose "$dir" "$compose_file" up -d

    check_http "$name" "$healthcheck_url"
    echo ""
}

echo "[1/2] Deploiement du site ultimatebegle.fr..."
deploy_react_site

echo "[2/2] Rechargement nginx hote (optionnel)..."
if [ "$RELOAD_NGINX" = "1" ]; then
    if ! command -v nginx >/dev/null 2>&1; then
        echo "ERREUR: nginx n'est pas installe sur l'hote alors que RELOAD_NGINX=1"
        exit 1
    fi

    nginx -t
    systemctl reload nginx
    echo "OK: nginx hote recharge"
else
    echo "INFO: rechargement nginx saute (definir RELOAD_NGINX=1 pour l'activer)."
fi

echo ""
echo "===================================="
echo "  Deployment termine avec succes!"
echo "===================================="
echo ""
echo "Cible verifiee:"
echo "- ultimatebegle.fr: $REACT_HEALTHCHECK_URL"
echo ""
echo "Variables utiles:"
echo "- REACT_APP_DIR pour pointer vers le dossier du site"
echo "- RELOAD_NGINX=1 pour tester/recharger nginx hote"
echo "- REACT_HEALTHCHECK_URL pour adapter la verification HTTP"
echo "- HEALTHCHECK_INITIAL_DELAY, HEALTHCHECK_RETRIES et HEALTHCHECK_RETRY_DELAY pour ajuster l'attente"
echo "- DOCKER_PRUNE_BEFORE_BUILD=1 pour nettoyer les caches/images pendantes avant build"

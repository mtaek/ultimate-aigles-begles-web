#!/bin/bash

echo "===================================="
echo "  Build et Deploy de l'application"
echo "===================================="
echo ""

echo "[1/2] Build de l'image Docker..."
docker compose build
if [ $? -ne 0 ]; then
    echo "ERREUR lors du build!"
    exit 1
fi

echo ""
echo "[2/2] Demarrage des conteneurs..."
docker compose up -d
if [ $? -ne 0 ]; then
    echo "ERREUR lors du demarrage!"
    exit 1
fi

echo ""
echo "===================================="
echo "  Deployment termine avec succes!"
echo "===================================="
echo ""
echo "L'application est accessible sur:"
echo "- https://ultimatebegles.fr"
echo ""

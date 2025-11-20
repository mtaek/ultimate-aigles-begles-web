# Script de déploiement pour Ultimate Aigles de Bègles

## Prérequis sur le serveur
- Docker et Docker Compose installés
- Accès SSH en tant que root
- Reverse proxy (nginx/apache) configuré pour HTTPS

## Déploiement

### 1. Sur votre machine locale
```bash
# Commit et push vos changements
git add .
git commit -m "Update"
git push origin dev
```

### 2. Sur le serveur
```bash
# Se connecter au serveur
ssh root@aiglesdebegles

# Aller dans le dossier
cd /webapp/ultimate-aigles-begles-web/react-app

# Pull les derniers changements
git pull origin dev

# Rebuild et redémarrer le container
docker-compose down
docker-compose up -d --build

# Vérifier les logs
docker-compose logs -f
```

## Configuration du reverse proxy

### Pour Nginx (sur le serveur principal)
Ajouter dans votre configuration nginx :

```nginx
server {
    listen 443 ssl http2;
    server_name aiglesdebegles.aquilenet.fr;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location /webapp/ {
        proxy_pass http://localhost:8080/webapp/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Puis recharger nginx :
```bash
nginx -t
systemctl reload nginx
```

## Commandes utiles

```bash
# Voir les containers en cours
docker-compose ps

# Voir les logs
docker-compose logs -f

# Arrêter l'application
docker-compose down

# Démarrer l'application
docker-compose up -d

# Rebuild complet
docker-compose up -d --build --force-recreate

# Nettoyer les images non utilisées
docker system prune -a
```

## URL de l'application
https://aiglesdebegles.aquilenet.fr/webapp/

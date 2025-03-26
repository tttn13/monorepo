#!/bin/bash
set -e

# Build the builder image first
echo "Building builder image..."
docker build --target builder --no-cache -t kora-backend-builder .

# Build the runner image
echo "Building runner image..."
docker build --target runner -t kora-backend .

# Tag the image for Docker Hub
echo "Tagging image..."
docker tag kora-backend tttn13/zucal-backend:v1.0

# Push to Docker Hub
echo "Pushing image to Docker Hub..."
docker push tttn13/zucal-backend:v1.0

echo "Process completed successfully!"
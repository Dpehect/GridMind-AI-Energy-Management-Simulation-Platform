#!/bin/sh
set -eu

APP_DIR="${GRIDMIND_APP_DIR:-/opt/gridmind}"
RELEASES_DIR="$APP_DIR/releases"
CURRENT_LINK="$APP_DIR/current"
RELEASE_ID="$(date +%Y%m%d%H%M%S)"
TARGET="$RELEASES_DIR/$RELEASE_ID"

mkdir -p "$TARGET"

tar \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude='*.db' \
  -cf - . | tar -xf - -C "$TARGET"

cd "$TARGET"

npm ci
npm run db:generate
npm run build
npm run audit:release
npm run preflight:production

ln -sfn "$TARGET" "$CURRENT_LINK"

echo "Release activated: $RELEASE_ID"

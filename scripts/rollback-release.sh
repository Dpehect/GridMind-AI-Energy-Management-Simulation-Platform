#!/bin/sh
set -eu

RELEASE_DIR="${GRIDMIND_RELEASE_DIR:-/opt/gridmind/releases}"
CURRENT_LINK="${GRIDMIND_CURRENT_LINK:-/opt/gridmind/current}"
BACKUP_DIR="${GRIDMIND_BACKUP_DIR:-/var/backups/gridmind}"

PREVIOUS_RELEASE="$(ls -1dt "$RELEASE_DIR"/* | sed -n '2p')"

if [ -z "$PREVIOUS_RELEASE" ]; then
  echo "No previous release found."
  exit 1
fi

LATEST_BACKUP="$(ls -1t "$BACKUP_DIR"/*.db | head -n 1)"

if [ -z "$LATEST_BACKUP" ]; then
  echo "No database backup found."
  exit 1
fi

ln -sfn "$PREVIOUS_RELEASE" "$CURRENT_LINK"

echo "Application release rolled back to: $PREVIOUS_RELEASE"
echo "Database backup available at: $LATEST_BACKUP"
echo "Restore the database only if the schema is incompatible."

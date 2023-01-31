#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e

# Wait for the backend to be up, if we know where it is.
if [ -n "$CUSTOMERS_HOST" ]; then
  /usr/src/app/wait-for-it.sh "$CUSTOMERS_HOST:${CUSTOMERS_PORT:-5432}"
fi

# Run the main container command.
exec "$@"
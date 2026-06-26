#!/usr/bin/env bash
#
# Self-hosted Contribution Snake generator.
#
# Generates the snake animation locally (via the same Docker image the
# Platane/snk GitHub Action uses) and force-pushes the result to the
# `output` branch — no GitHub Actions required. This is the path that keeps
# working even when GitHub-hosted Actions are unavailable (e.g. a billing
# lock), because public-repo `git push` is not gated by Actions billing.
#
# Requirements on this machine:
#   - docker (daemon running)
#   - git
#   - a GitHub token exported as GITHUB_TOKEN with scopes:
#       * read:user      (to read the contribution calendar)
#       * public_repo    (to push the SVGs to the `output` branch)
#     A classic PAT with `repo` + `read:user` also works.
#
# Usage:
#   export GITHUB_TOKEN=ghp_xxx
#   ./scripts/generate-snake.sh
#
# Optional env overrides:
#   GH_USER   GitHub username (default: repository owner from `origin`)
#   SNK_IMAGE Pinned snk image (default: the one Platane/snk@v3 uses)

set -euo pipefail

# --- config ---------------------------------------------------------------
SNK_IMAGE="${SNK_IMAGE:-platane/snk@sha256:3a66a51ca8eaecc1e841bc8baae39bd88079e57419850d1ed005eee2bbfce940}"
OUTPUT_BRANCH="output"

# --- preconditions --------------------------------------------------------
if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "ERROR: GITHUB_TOKEN is not set." >&2
  echo "       export GITHUB_TOKEN=<a PAT with read:user + public_repo> and retry." >&2
  exit 1
fi
command -v docker >/dev/null || { echo "ERROR: docker not found." >&2; exit 1; }
command -v git    >/dev/null || { echo "ERROR: git not found." >&2; exit 1; }
docker info >/dev/null 2>&1 || { echo "ERROR: docker daemon is not running." >&2; exit 1; }

# Resolve repo root and remote so the script works from anywhere.
REPO_ROOT="$(git rev-parse --show-toplevel)"
ORIGIN_URL="$(git -C "$REPO_ROOT" remote get-url origin)"

# Derive "owner/repo" from the origin URL (supports https and ssh forms).
SLUG="$(printf '%s' "$ORIGIN_URL" \
  | sed -E 's#^git@github.com:#https://github.com/#' \
  | sed -E 's#^https://github.com/##' \
  | sed -E 's#\.git$##')"
OWNER="${SLUG%%/*}"
GH_USER="${GH_USER:-$OWNER}"

echo "Repo:   $SLUG"
echo "User:   $GH_USER"
echo "Image:  $SNK_IMAGE"

# --- generate -------------------------------------------------------------
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
mkdir -p "$WORK/dist"

# Docker actions read inputs from INPUT_<UPPERCASE_NAME> env vars and write
# outputs relative to the working directory. We mount $WORK as the workspace.
docker run --rm \
  --user "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -e INPUT_GITHUB_USER_NAME="$GH_USER" \
  -e INPUT_GITHUB_TOKEN="$GITHUB_TOKEN" \
  -e GITHUB_TOKEN="$GITHUB_TOKEN" \
  -e INPUT_OUTPUTS="$(cat <<'EOF'
dist/github-snake.svg
dist/github-snake-dark.svg?palette=github-dark
dist/ocean.gif?color_snake=orange&color_dots=#bfd6f6,#8dbdff,#64a1f4,#4b91f1,#3c7dd9
EOF
)" \
  -v "$WORK":/github/workspace \
  -w /github/workspace \
  "$SNK_IMAGE"

ls -la "$WORK/dist"
test -s "$WORK/dist/github-snake.svg"      || { echo "ERROR: github-snake.svg not generated." >&2; exit 1; }
test -s "$WORK/dist/github-snake-dark.svg" || { echo "ERROR: github-snake-dark.svg not generated." >&2; exit 1; }

# --- publish to the output branch (force-push, single commit) -------------
# Build a throwaway repo containing ONLY the generated files so they land at
# the root of the `output` branch (matching the README's raw URLs).
PUB="$WORK/publish"
mkdir -p "$PUB"
cp "$WORK"/dist/* "$PUB"/

PUSH_URL="https://x-access-token:${GITHUB_TOKEN}@github.com/${SLUG}.git"

git -C "$PUB" init -q
git -C "$PUB" checkout -q -b "$OUTPUT_BRANCH"
git -C "$PUB" add -A
git -C "$PUB" \
  -c user.email="snake-bot@users.noreply.github.com" \
  -c user.name="snake-bot" \
  commit -q -m "Update snake animation [skip ci]"

echo "Pushing to $OUTPUT_BRANCH ..."
git -C "$PUB" push -f "$PUSH_URL" "$OUTPUT_BRANCH:$OUTPUT_BRANCH" 2>&1 \
  | sed -E "s#x-access-token:[^@]+@#x-access-token:***@#g"

echo "Done. Snake published to the '$OUTPUT_BRANCH' branch."
echo "It will appear on your profile within a minute or two."

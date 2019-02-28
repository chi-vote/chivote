#!/bin/bash

# git hook to run a command after `git pull` if a specified file was changed
# Run `chmod +x post-merge` to make it executable then put it into `.git/hooks/`.

DIR=$(dirname $(greadlink -f $0 || readlink -f $0))
echo $DIR

changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"
force_flag=

if test "$1" = "--force"; then
  force_flag=true
fi

check_run() {
  $(cd $DIR)

  if [ "$force_flag" ]
  then
    echo -e "\n\033[7m$ $2\033[27m" && eval "$2"
  else
	  echo "$changed_files" | grep --quiet "$1" && echo -e "\n\033[7m$ $2\033[27m" && eval "$2"
  fi
}

main() {
  # do work here
  check_run 'Pipfile' 'pipenv install --sequential'
  check_run 'frontend/package.json' 'yarn --cwd ./frontend install'
  check_run 'frontend/.*' 'yarn --cwd ./frontend build'
  check_run 'frontend/.*' 'yarn --cwd ./frontend render-server:build'
  check_run 'apps/.*/migrations' 'pipenv run ./manage.py migrate'
  check_run '.*' 'pipenv run ./manage.py collectstatic --no-input'
  check_run '.*' 'pipenv run ./manage.py build --settings=chivote.settings.production'
}

main

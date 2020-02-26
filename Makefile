.DEFAULT_GOAL:= run
# add the local node_module binarys, and fastlane to the PATH
PATH := ./node_modules/.bin:$HOME/.fastlane/bin:$(PATH)
SHELL := /bin/bash
args = $(filter-out $@, $(MAKECMDGOALS))
.PHONY: data test build

# Stops the packager, quits the Simulator, stops watchman, and deletes all generated install files
clean-deep: clean
	@# Removing node_modules, React temp files, etc.
	@echo '💣 💣 Remove all the things 💣 💣'
	@rm -rf \
		node_modules \
		utils/*/node_modules \
		*.log \
		.DS_STORE \
		.eslintcache \
		package-lock.json \
		utils/*/package-lock.json

clean:
	@rm -rf utils/*/dist

install:
	@echo '🔱 installing node modules'
	@yarn
	@lerna bootstrap
	@make build

# This will give you a fresh instance of the project. Run this if you run into a weird build
# issue you can't solve. Also run this if you have been messing around with dependencies and
# make sure everything's still working correctly before you commit.
reinstall:
	@make clean-deep install

build:
	@gulp build

# This runs all the linters at the same time
lint:
	@echo '🔧 running lint'
	@make lint-js lint-json lint-md --jobs
# This will run all the js files through prettier, then through eslint
lint-js:
	@eslint 'utils/*/**/*.@(js|mjs|jsx)' '*@(js|mjs|jsx)' --cache --fix
# This will run all the json files through prettier
lint-json:
	@prettier 'utils/*/**/*.json' *.json --write --parser json
# This will run all the markdown files through prettier
lint-md:
	@prettier 'utils/*/**/*.md' *.md --write --parser markdown

link-global:
	@lerna exec 'yarn link --force'


# Runs all the tests with code coverage
# You can pass arguments to it like this `make test -- --watch`
test:
	@echo '💈 running unit tests'
	@jest --verbose $(args)
# run tests with coverage
test-coverage:
	@make test -- --coverage

watch:
	@gulp watch

# publish the live build on ios and android
publish:
	@make reinstall
	@make build lint
	@# no idea why but this can't be on the same line as the lint
	@make test
	@lerna publish

# @todo not sure if this can be used with lerna
update-version:
	@npx \
		--package conventional-changelog-eslint@3.0 \
		--package @semantic-release/changelog@3.0  \
		--package @semantic-release/git@7.0 \
		--package semantic-release@15.13 \
		semantic-release $(args)

index-files:
	@scripts/index-files.js

copy-license:
	@scripts/copy-license
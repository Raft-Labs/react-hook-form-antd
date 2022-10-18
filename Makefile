BASE_PATH=$(PWD)

all:
	@echo
	@echo "please specifiy the command 👊"
	@echo

release:
	# release: patch/minor/major
	npm run release -- --release-as $(release)

release-changelog:
	$(BASE_PATH)/scripts/release-changelog.sh "$(BASE_PATH)" "$(stage)"

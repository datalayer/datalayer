clean:
	rm -fr build
	rm -fr dist
	rm -fr *.egg-info
	find . -name '*.egg-info' -exec rm -fr {} +

build:
	python setup.py sdist bdist_egg bdist_wheel

install:
	python setup.py install --record files.txt

publish:
	python setup.py sdist bdist_egg bdist_wheel upload

python:
	PYTHONPATH=./dist/datalayer_lab-0.0.1-py3-none-any.whl python

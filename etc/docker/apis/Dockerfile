# FROM python:3.7.2-alpine as base
FROM python:3.7.2 as base

# FROM base as builder
# RUN mkdir /install
# WORKDIR /install
# COPY app/requirements.txt /requirements.txt
# RUN pip3 install --no-cache-dir --install-option="--prefix=/install" -r /requirements.txt

# FROM base
# COPY --from=builder /install /usr/local

COPY app/requirements.txt /requirements.txt
RUN pip3 install --no-cache-dir -r /requirements.txt
COPY app /app
WORKDIR /app
EXPOSE 8989
CMD ["python", "main.py"]

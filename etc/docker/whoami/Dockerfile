FROM golang:1.11 as builder

WORKDIR /go/whoami
COPY . .
RUN make build-src

# Create a minimal container to run a Golang static binary
FROM scratch
COPY --from=builder /go/whoami/target/whoami .
ENTRYPOINT ["/whoami"]

EXPOSE 80

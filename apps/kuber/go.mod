module github.com/datalayer/datalayer/apps/kuber

require (
	cloud.google.com/go v0.31.0
	contrib.go.opencensus.io/exporter/ocagent v0.3.0 // indirect
	github.com/Azure/azure-sdk-for-go v11.2.0-beta+incompatible
	github.com/Azure/go-autorest v11.2.6+incompatible
	github.com/aws/aws-sdk-go v1.15.64
	github.com/blang/semver v3.5.1+incompatible // indirect
	github.com/c-bata/go-prompt v0.2.3
	github.com/davecgh/go-spew v1.1.1
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
	github.com/digitalocean/godo v1.6.0
	github.com/docker/distribution v2.6.2+incompatible
	github.com/docker/spdystream v0.0.0-20181023171402-6480d4af844c // indirect
	github.com/emicklei/go-restful v2.8.0+incompatible
	github.com/fatih/color v1.7.0
	github.com/fsnotify/fsnotify v1.4.7
	github.com/ghodss/yaml v1.0.0
	github.com/go-openapi/spec v0.17.2
	github.com/gogo/protobuf v1.1.1
	github.com/golang/glog v0.0.0-20160126235308-23def4e6c14b
	github.com/golang/mock v1.1.1
	github.com/golang/protobuf v1.2.0
	github.com/google/btree v0.0.0-20180813153112-4030bb1f1f0c // indirect
	github.com/google/go-querystring v1.0.0 // indirect
	github.com/google/gofuzz v0.0.0-20170612174753-24818f796faf
	github.com/googleapis/gnostic v0.2.0 // indirect
	github.com/gorilla/handlers v1.4.0
	github.com/gorilla/mux v1.6.2
	github.com/gorilla/sessions v1.1.3
	github.com/gorilla/websocket v1.4.0
	github.com/gregjones/httpcache v0.0.0-20180305231024-9cad4c3443a7 // indirect
	github.com/howeyc/gopass v0.0.0-20170109162249-bf9dde6d0d2c // indirect
	github.com/imdario/mergo v0.3.6 // indirect
	github.com/json-iterator/go v1.1.5 // indirect
	github.com/juju/ratelimit v1.0.1
	github.com/kr/fs v0.1.0 // indirect
	github.com/kris-nova/klone v1.2.0
	github.com/kris-nova/kubicorn v0.0.0-20171230012949-d5557749526c
	github.com/kris-nova/lolgopher v0.0.0-20180921204813-313b3abb0d9b
	github.com/kubernetes/dashboard v1.10.1-0.20181024085611-937fe2caa65d
	github.com/mattn/go-colorable v0.0.9 // indirect
	github.com/mattn/go-isatty v0.0.4 // indirect
	github.com/mattn/go-runewidth v0.0.3 // indirect
	github.com/minio/minio-go v6.0.9+incompatible
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.1 // indirect
	github.com/mrjones/oauth v0.0.0-20180629183705-f4e24b6d100c
	github.com/packethost/packngo v0.1.0
	github.com/pborman/uuid v1.2.0 // indirect
	github.com/peterbourgon/diskv v2.0.1+incompatible // indirect
	github.com/pkg/errors v0.8.0
	github.com/pkg/sftp v1.8.3
	github.com/pkg/term v0.0.0-20180730021639-bffc007b7fd5 // indirect
	github.com/prometheus/client_golang v0.9.0
	github.com/prometheus/client_model v0.0.0-20180712105110-5c3871d89910
	github.com/prometheus/common v0.0.0-20181020173914-7e9e6cabbd39 // indirect
	github.com/prometheus/procfs v0.0.0-20181005140218-185b4288413d // indirect
	github.com/racker/perigee v0.1.0 // indirect
	github.com/rackspace/gophercloud v1.0.0 // indirect
	github.com/sergi/go-diff v1.0.0 // indirect
	github.com/sirupsen/logrus v1.1.1
	github.com/spf13/afero v1.1.2
	github.com/spf13/cobra v0.0.3
	github.com/spf13/pflag v1.0.3
	github.com/spf13/viper v1.3.1
	github.com/src-d/gcfg v1.4.0 // indirect
	github.com/stretchr/testify v1.2.2
	github.com/tcnksm/go-gitconfig v0.1.2
	github.com/tent/http-link-go v0.0.0-20130702225549-ac974c61c2f9 // indirect
	github.com/yuroyoro/swalker v0.0.0-20160622113523-0a5950e9162f
	go.opencensus.io v0.18.0 // indirect
	golang.org/x/crypto v0.0.0-20181203042331-505ab145d0a9
	golang.org/x/net v0.0.0-20190213061140-3a22650c66bd
	golang.org/x/oauth2 v0.0.0-20181017192945-9dcd33a902f4
	golang.org/x/sync v0.0.0-20181108010431-42b317875d0f
	golang.org/x/text v0.3.0
	golang.org/x/time v0.0.0-20180412165947-fbb02b2291d2 // indirect
	golang.org/x/tools v0.0.0-20190228203856-589c23e65e65 // indirect
	google.golang.org/api v0.0.0-20181030000543-1d582fd0359e
	google.golang.org/genproto v0.0.0-20180831171423-11092d34479b
	google.golang.org/grpc v1.15.0
	gopkg.in/igm/sockjs-go.v2 v2.0.0
	gopkg.in/inf.v0 v0.9.1 // indirect
	gopkg.in/square/go-jose.v2 v2.1.9
	gopkg.in/src-d/go-git.v4 v4.0.0-rc5
	gopkg.in/warnings.v0 v0.1.2 // indirect
	gopkg.in/yaml.v2 v2.2.2
	k8s.io/api v0.0.0-20180308224125-73d903622b73
	k8s.io/apiextensions-apiserver v0.0.0-20181030013921-9285b109083e
	k8s.io/apimachinery v0.0.0-20180228050457-302974c03f7e
	k8s.io/client-go v2.0.0-alpha.0.0.20180406111602-989be4278f35+incompatible
	k8s.io/heapster v1.5.4
	k8s.io/kube-deploy v0.0.0-20171201210511-6021f6f3619b
	k8s.io/kubernetes v1.12.2
)

package log

import (
	"bytes"
	"fmt"

	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

const (
	TagInit                  = "Init"
	TagCreateCluster         = "CreateCluster"
	TagValidateCreateCluster = "ValidateCreateCluster"
	TagValidateUpdateCluster = "ValidateUpdateCluster"
	TagGetClusterStatus      = "GetClusterStatus"
	TagUpdateCluster         = "UpdateCluster"
	TagGetCluster            = "GetCluster"
	TagDeleteCluster         = "DeleteCluster"
	TagDeleteDeployment      = "DeleteDeployment"
	TagCreateDeployment      = "CreateDeployment"
	TagListDeployments       = "ListDeployments"
	TagListClusters          = "ListClusters"
	TagGetClusterInfo        = "GetClusterInfo"
	TagFetchClusterConfig    = "FetchClusterConfig"
	TagGetTillerStatus       = "GetTillerStatus"
	TagFetchDeploymentStatus = "FetchDeploymentStatus"
	TagAuth                  = "Auth"
)

var logger *logrus.Logger

func Logger() *logrus.Logger {

	if logger == nil {

		logger = logrus.New()

		switch viper.GetString("dev.loglevel") {
		case "debug":
			logrus.SetLevel(logrus.DebugLevel)
		case "info":
			logrus.SetLevel(logrus.InfoLevel)
		case "warn":
			logrus.SetLevel(logrus.WarnLevel)
		case "error":
			logrus.SetLevel(logrus.ErrorLevel)
		case "fatal":
			logrus.SetLevel(logrus.FatalLevel)
		default:
			// logrus.WithField("dev.loglevel", viper.GetString("dev.loglevel")).Warning("Invalid log level. Defaulting to info.")
			logrus.SetLevel(logrus.InfoLevel)
		}

		switch viper.GetString("dev.logformat") {
		case "text":
			logrus.SetFormatter(new(logrus.TextFormatter))
		case "json":
			logrus.SetFormatter(new(logrus.JSONFormatter))
		default:
			//logrus.WithField("dev.logformat", viper.GetString("dev.logformat")).Warning("Invalid log format. Defaulting to text.")
			logrus.SetFormatter(new(logrus.TextFormatter))
		}

		logger.SetLevel(logrus.DebugLevel)
	}

	return logger

}
func Info(tag string, args ...interface{}) {
	Logger().Info(getTag(tag), getMessage(args))
}

func Error(tag string, args ...interface{}) {
	Logger().Error(getTag(tag), getMessage(args))
}

func Errorf(tag string, args ...interface{}) {
	Logger().Errorf(getTag(tag), getMessage(args))
}

func Warn(tag string, args ...interface{}) {
	Logger().Warn(getTag(tag), getMessage(args))
}

func Warnf(tag string, args ...interface{}) {
	Logger().Warnf(getTag(tag), getMessage(args))
}

func Debug(tag string, args ...interface{}) {
	Logger().Debug(getTag(tag), getMessage(args))
}

func getTag(tag string) string {
	return " [" + tag + "] "
}

func getMessage(args []interface{}) string {
	var buffer bytes.Buffer
	for i, a := range args {
		switch a.(type) {
		case string:
			buffer.WriteString(fmt.Sprintf("%s", a))
			break
		case int:
			buffer.WriteString(fmt.Sprintf("%d", a))
			break
		default:
			buffer.WriteString(fmt.Sprintf("%v", a))
			break
		}
		if i+1 < len(args) {
			buffer.WriteString(" ")
		}
	}
	return buffer.String()
}

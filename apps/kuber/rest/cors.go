package rest

import "github.com/datalayer/datalayer/apps/kuber/config"

func AllowedHeaders() []string {
	return []string{
		"Accept",
		"Access-Control-Allow-Credentials",
		"Access-Control-Allow-Origin",
		"Access-Control-Request-Headers",
		"Access-Control-Request-Method",
		"Accept-Encoding",
		"Accept-Language",
		"Authorization",
		"Connection",
		"Cookie",
		"Content-Type",
		"Host",
		"Origin",
		"Referer",
		"User-Agent",
		"X-Requested-With",
	}
}

func AllowedOrigins() []string {
	return []string{
		"http://localhost:*",
		"https://datalayer.io",
		config.KuberConfig.LibraryRest,
	}
}

func AllowedMethods() []string {
	return []string{
		"GET",
		"POST",
		"DELETE",
		"HEAD",
		"PUT",
		"OPTIONS",
	}

}

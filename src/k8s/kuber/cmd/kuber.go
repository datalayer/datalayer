package cmd

import (
	"fmt"
	"log"
	"os"

//	"strings"

	"github.com/fsnotify/fsnotify"
	"github.com/kris-nova/kubicorn/cutil/logger"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var cfgFile string

// KuberCmd represents the base command when called without any subcommands
var KuberCmd = &cobra.Command{

	Use:   "kuber",
	Short: "Kuber, Multicloud Kubernetes",
	Long:  `Create and operate Kubernetes clusters.`,
	// Uncomment the following line if your bare application has an action associated with it:
	//	Run: func(cmd *cobra.Command, args []string) { },
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := KuberCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {

	cobra.OnInitialize(initConfig)

	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here, will be global for your application.
	KuberCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.kuber.yaml)")

	KuberCmd.PersistentFlags().IntVarP(&logger.Level, "verbose", "v", 3, "Log level")
	KuberCmd.PersistentFlags().BoolVarP(&logger.Color, "color", "C", true, "Toggle colorized logs")
	KuberCmd.PersistentFlags().BoolVarP(&logger.Fabulous, "fab", "f", false, "Toggle colorized logs")

	// Cobra also supports local flags, which will only run when this action is called directly.
	KuberCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")

	// add commands
	addCommands()
}

func addCommands() {
	KuberCmd.AddCommand(CreateCmd())
	KuberCmd.AddCommand(ApplyCmd())
	KuberCmd.AddCommand(DeleteCmd())
	//	KuberCmd.AddCommand(ServerCmd)
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	/*
		if cfgFile != "" {
			// Use config file from the flag.
			viper.SetConfigFile(cfgFile)
		} else {
			// Find home directory.
			home, err := homedir.Dir()
			if err != nil {
				fmt.Println(err)
				os.Exit(1)
			}

			// Search config in home directory with name ".cobra-example" (without extension).
			viper.AddConfigPath(home)
			viper.SetConfigName(".kuber")
		}

		viper.AutomaticEnv() // read in environment variables that match

		// If a config file is found, read it in.
		if err := viper.ReadInConfig(); err == nil {
			fmt.Println("Using config file:", viper.ConfigFileUsed())
		}
	*/
	viper.SetEnvPrefix("dla")
//	viper.SetEnvKeyReplacer(strings.NewReplacer("-", "_"))
//	viper.SetEnvKeyReplacer(strings.NewReplacer("_", ""))
	viper.AutomaticEnv()

	viper.SetConfigName("kuber")
	viper.SetConfigType("yml")

	viper.AddConfigPath("$HOME/.datalayer")
	viper.AddConfigPath("/etc/datalayer")
	viper.AddConfigPath("./config")
	viper.AddConfigPath("./")
	viper.WatchConfig()

	viper.OnConfigChange(func(e fsnotify.Event) {
		log.Println("Config file changed:", e.Name)
	})

	// Find and read the config file.
	//	if err := viper.ReadInConfig(); err != nil {
	//		log.Println("Error reading config file", err)
	//	}
	// Confirm which config file is used.
	//	log.Printf("Using config file: %s\n", viper.ConfigFileUsed())

}

func flagApplyAnnotations(cmd *cobra.Command, flag, completion string) {
	if cmd.Flag(flag) != nil {
		if cmd.Flag(flag).Annotations == nil {
			cmd.Flag(flag).Annotations = map[string][]string{}
		}
		cmd.Flag(flag).Annotations[cobra.BashCompCustom] = append(
			cmd.Flag(flag).Annotations[cobra.BashCompCustom],
			completion,
		)
	}
}

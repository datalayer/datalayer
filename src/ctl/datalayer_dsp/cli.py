"""Comand line tool to interact with Dsplayer.
"""
from __future__ import print_function, unicode_literals

import argparse
import configparser
import sys
import os
import logging
from pathlib import Path
from .commands import build, run_command, delete_command, run_spark_job, setup, cleanup

logger = logging.getLogger(__name__)

def _argparse():
    parser = argparse.ArgumentParser(
        prog='ds',
        description='datalayer cli',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        '--config',
        dest='config_file',
        default=str(Path.home()) + '/.datalayer',
        help='Path to configuration file.'
    )
    parser.add_argument(
        '-l', '--log_level',
        metavar='LOG_LEVEL',
        choices=['info', 'debug', 'warning', 'error'],
        default='info',
        help='set log level. Valid options are info, debug, warning and error'
    )
    parser.add_argument(    parser.add_argument(
        '-p', '--spark_packages',
        metavar='SPARK_PACKAGES',
        help='comma separated list of packages to run spark-submit command'
    )
    return parser

def set_log_level(log_level):
    """Set log level
    """
    log_levels = {
        'info': logging.INFO,
        'debug': logging.DEBUG,
        'warning': logging.WARNING,
        'error': logging.ERROR,
    }
    logging.basicConfig(level=log_levels[log_level], format='%(asctime)s %(levelname)s: %(message)s')

def execute():
    parser = _argparse()
    if len(sys.argv) == 1:
        parser.print_help()
        sys.exit(1)
    args = parser.parse_args()
    # Read arguments from configfile.
    config = configparser.ConfigParser()
    if not os.path.exists(args.config_file):
        config['main'] = {}
        config.write(open(args.config_file, 'w'))
    config.read(args.config_file)
    set_log_level(args.log_level)
    logger.info("welcome to datalayer")
    if args.command[0] == 'build':
        build(build_container_names=args.build_container_names)
    elif args.command[0] == 'run':
        run_command(
            log_level=args.log_level,
            source_code_path=source_code_path,
            scripts_dir=scripts_dir
        )
    else:
        logger.error('command %s not supported' % args.command[0])

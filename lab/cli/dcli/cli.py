"""Comand line tool to interact with Datalayer.
"""
from __future__ import print_function, unicode_literals

import argparse
import configparser
import sys
import os
import logging
from pathlib import Path
from .commands import hello_command

logger = logging.getLogger(__name__)

def _argparse():
    parser = argparse.ArgumentParser(
        prog='dcli',
        description='Datalayer CLI',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )

    parser.add_argument(
        '--config',
        dest='config_file',
        default=str(Path.home()) + '/.datalayer',
        help="""
        Path to configuration file.
        """
    )

    parser.add_argument(
        '-l', '--log_level',
        metavar='LOG_LEVEL',
        choices=['info', 'debug', 'warning', 'error'],
        default='info',
        help='set log level. Valid options are info, debug, warning and error'
    )

    parser.add_argument(
        'command',
        metavar='COMMAND',
        type=str, nargs=1,
        help='Command to execute on Datalayer. Valid options are hello',
        choices=['hello']
    )

    parser.add_argument(
        '-d', '--data-file',
        metavar='DATA_FILE',
        help='Path to data file'
    )

    return parser

def set_log_level(log_level):
    """Set log level.
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
    logger.info("Welcome to Datalayer")

    if args.command[0] == 'hello':
        hello_command()
    else:
        logger.error('command %s not supported' % args.command[0])

def main():
    execute()

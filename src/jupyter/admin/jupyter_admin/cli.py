import argparse
import configparser
import logging
import os
import sys

from pathlib import Path

from .commands.iam import execute_iam
from .commands.library import execute_library


logger = logging.getLogger(__name__)


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

class DspCli(object):

    def __init__(self):
        self.gen_parser = argparse.ArgumentParser(
            description='Datalayer DSP Command Line Interface'
            )
        self.gen_parser.add_argument(
            '--config',
            dest='config_file',
            default=str(Path.home()) + '/.datalayer/config',
            help='Path to configuration file.'
        )
        self.gen_parser.add_argument(
            '-l', '--log-level',
            metavar='LOG_LEVEL',
            choices=['info', 'debug', 'warning', 'error'],
            default='info',
            help='set log level. Valid options are info, debug, warning and error'
        )

        self.parser = argparse.ArgumentParser(
            description='Datalayer DSP Command Line Interface'
            )

        self.subparsers = self.parser.add_subparsers(help='sub-command help')
        self.subparsers.required = True
        self.subparsers.dest = 'command'

        parser_iam = self.iam_parser()
        parser_library = self.library_parser()

        args = self.parser.parse_args()

        # Read arguments from configfile.
        config = configparser.ConfigParser()
        if not os.path.exists(args.config_file):
            config['main'] = {}
            config.write(open(args.config_file, 'w'))
        config.read(args.config_file)

        if not hasattr(self, args.command):
            print('Unrecognized command')
            parser.print_help()
            exit(1)

        if not args.log_level:
            log_level = config.get('main', 'log_level')
        set_log_level(args.log_level)
        logger.debug("Welcome to Datalayer DSP Command Line Interface")

        # Use dispatch pattern to invoke method with same name
        getattr(self, args.command)(args)

    """IAM
    """

    def iam_parser(self):
        parser_iam = self.subparsers.add_parser(
            'iam',
            parents=[self.gen_parser],
            add_help=False,
            description="The iam parser",
            help="Manage the iam environment"
            )
        options=[
            'export-users',
            'init-users',
            'list-users',
            'mail-users',
            ]
        parser_iam.add_argument(
            'iam_command',
            metavar='COMMAND',
            type=str,
            nargs=1,
            help='Command to execute. Valid options: {}'.format(', '.join(options)),
            choices=options,
        )
        parser_iam.add_argument('--filter', help='Filter to apply')
        parser_iam.add_argument('--full', action='store_true', help='Print full details')

    def iam(self, args):
        execute_iam(args)

    """Library
    """

    def library_parser(self):
        parser_library = self.subparsers.add_parser(
            'library',
            parents=[self.gen_parser],
            add_help=False,
            description='The library parser',
            help='Manage the library environment',
            )
        options=[
            'list-datasets',
            ]
        parser_library.add_argument(
            'library_command',
            metavar='COMMAND',
            type=str,
            nargs=1,
            help='Command to execute. Valid options: {}'.format(', '.join(options)),
            choices=options,
            )
        return parser_library

    def library(self, args):
        execute_library(args)

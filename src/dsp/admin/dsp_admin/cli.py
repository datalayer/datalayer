import logging
import argparse
import configparser
import os
import sys

from pathlib import Path


logger = logging.getLogger("__name__")


def set_log_level(log_level):
    """Set log level.
    """
    log_levels = {
        'info': logging.INFO,
        'debug': logging.DEBUG,
        'warning': logging.WARNING,
        'error': logging.ERROR,
    }
    logging.basicConfig(
        level=log_levels[log_level], 
        format='%(asctime)s %(levelname)s: %(message)s',
        force=True
        )


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
            default='warning',
            help='set log level. Valid options are info, debug, warning and error'
        )
        self.parser = argparse.ArgumentParser(
            description='Datalayer DSP Command Line Interface'
            )
        self.subparsers = self.parser.add_subparsers(help='sub-command help')
        self.subparsers.required = True
        self.subparsers.dest = 'command'
        self.auth_parser()
        self.library_parser()
        args = self.parser.parse_args()
        # Read arguments from configfile.
        config = configparser.ConfigParser()
        if not os.path.exists(args.config_file):
            config['main'] = {}
            config.write(open(args.config_file, 'w'))
        config.read(args.config_file)
        if not hasattr(self, args.command):
            print('Unrecognized command')
            self.parser.print_help()
            exit(1)
        if not args.log_level:
            log_level = config.get('main', 'log_level')
        else:
            log_level = args.log_level
        set_log_level(log_level)
        logger.debug(f'Starting Datalayer DSP Command Line Interface')
        # Use dispatch pattern to invoke method with same name.
        getattr(self, args.command)(args)


    """AUTH Parser.
    """

    def auth_parser(self):
        parser_auth = self.subparsers.add_parser(
            'auth',
            parents=[self.gen_parser],
            add_help=False,
            description="The auth parser",
            help="Manage the auth environment"
            )
        options=[
            'delete-users',
            'export-ldap-users',
            'import-users',
            'init-ldap-users',
            'list-ldap-users',
            'list-users',
            'mail-users',
            ]
        parser_auth.add_argument(
            'auth_command',
            metavar='COMMAND',
            type=str,
            nargs=1,
            help='Command to execute. Valid options: {}'.format(', '.join(options)),
            choices=options,
        )
        parser_auth.add_argument('-q', '--query', default='*:*', help='Query to be applied to the given command)')
        parser_auth.add_argument('-f', '--filter', help='Filter to apply on uid (check if uid contains the given value)')
        parser_auth.add_argument('-d', '--details', action='store_true', help='Print details')


    def auth(self, args):
        from .auth.auth import execute_auth
        execute_auth(args)


    """Library Parser.
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
        from .library.library import execute_library
        execute_library(args)

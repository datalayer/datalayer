import logging

logger = logging.getLogger("__name__")

def hello_command():
    print('Hello')
    logger.info('Hello Info')
    logger.debug('Hello Debug')

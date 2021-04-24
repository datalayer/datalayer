# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.


import os

from dsp_utils.mail.mail import send_mail


def send_user_mail(sender, recipient, subject, text, html):
    send_mail(sender, recipient, subject, text, html)

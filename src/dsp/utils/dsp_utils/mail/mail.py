import os
import logging
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


logger = logging.getLogger("__name__")


smtp_host = os.getenv('DSP_SMTP_HOST')
smtp_port = int(os.getenv('DSP_SMTP_PORT'))
smtp_username = os.getenv('DSP_SMTP_USERNAME')
smtp_password = os.getenv('DSP_SMTP_PASSWORD')


def send_mail(sender, recipients, subject, text, html):
    smtp_server = smtplib.SMTP(  
        host = smtp_host,
        port = smtp_port
    )
    smtp_server.starttls()
    smtp_server.login(smtp_username, smtp_password)
    logger.info(f'Sending mail to {recipients} with txt {txt} nad html {html}')
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipients
    part_text = MIMEText(text, 'plain')
    msg.attach(part_text)
    part_html = MIMEText(html, 'html')
    msg.attach(part_html)
    smtp_server.send_message(msg)
    smtp_server.quit()

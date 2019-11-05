#!/usr/bin/env python

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re, random

class SelWebdriverNewUser(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(20)
        self.base_url = 'http://myhost.mycompany.com/'
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_sel_webdriver_new_user(self):
        driver = self.driver
        HOST = 'myhost.mycompany.com'
        RANDINT = random.random()*10000
        driver.get('https://' + HOST)
 
        # Click on category link
        driver.find_element_by_xpath("//*[@id='nav']/ol/li[3]/a").click()

        # Click on sub-category link
        driver.find_element_by_xpath("//*[@id='top']/body/div/div[2]/div[2]/div/div[2]/ul/li[4]/a/span").click()

        # Click on product image
        driver.find_element_by_xpath("//*[@id='product-collection-image-374']").click()

        # Click Checkout button
        driver.find_element_by_xpath("//*[@id='checkout-button']/span/span").click()

        driver.find_element_by_id("billing:firstname").clear()
        driver.find_element_by_id("billing:firstname").send_keys("selenium", RANDINT, "_fname")

        driver.find_element_by_id("billing:lastname").clear()
        driver.find_element_by_id("billing:lastname").send_keys("selenium", RANDINT, "_lname")

        # Click Place Order
        driver.find_element_by_xpath("//*[@id='order_submit_button']").click()

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    print("1")
    unittest.main()
    print("2")

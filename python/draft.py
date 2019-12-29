from selenium import webdriver
driver = webdriver.Chrome(r'E:\谷歌\chromedriver.exe')
driver.get('http://localhost:8000/#/orders/draft_orders')
ele=driver.find_element_by_xpath("//span[@class='ant-form-item-children']//div[@class='ant-select ant-select-enabled']")
ele.click()
driver.find_element_by_xpath("//div[@id='b6a56aa1-b39a-45f6-9d16-f50624848f12']//ul[@class='ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical']")[0].click()
ele=driver.find_element_by_xpath("//div[]//input[@class='ant-calendar-picker-input ant-input']")
ele.click()
ele=driver.find_element_by_xpath("//div[@class='ant-calendar-footer']//span[@class='ant-calendar-footer-btn']")
ele.click()
pass 
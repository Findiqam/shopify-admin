from selenium import webdriver
driver = webdriver.Chrome(r'E:\谷歌\chromedriver.exe')
driver.get('http://localhost:8000/#/orders/abandoned_checkouts')

ele=driver.find_element_by_xpath("//span[@class='ant-form-item-children']//div[@class='ant-select ant-select-enabled']")
ele.click()
driver.find_element_by_xpath("//div[@id='23ae194c-3a5b-4d08-b90f-6b9df1e03359']//ul[@class='ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical']")[0].click()
ele=driver.find_element_by_xpath("////div[]//input[@class='ant-calendar-picker-input ant-input']")
ele.click()
ele=driver.find_element_by_xpath("//div[@class='ant-calendar-footer']//span[@class='ant-calendar-footer-btn']")
ele.click()
ele=driver.find_element_by_css_selector("button[type='button']")
ele.click()
pass 
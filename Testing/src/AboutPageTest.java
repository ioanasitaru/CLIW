import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 * Created by ioana on 16/01/2018.
 */
public class AboutPageTest {
    WebDriver driver;

    @Before
    public void setup() {
        System.setProperty("webdriver.chrome.driver", "..\\selenium-driver\\chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:5000/html/about.html");
        driver.switchTo().defaultContent();
    }

    @After
    public void tearDown() throws InterruptedException {
        driver.manage().deleteAllCookies();
        driver.quit();
    }

    @Test
    public void verifyButtonToMainPage() throws InterruptedException {
        WebElement button = driver.findElement(By.id("start-button"));
        Thread.sleep(5000);
        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView();", button);
        Thread.sleep(5000);
        button.click();
        Thread.sleep(5000);
        WebElement title = driver.findElement(By.id("main-title"));
        Assert.assertTrue(title.isDisplayed());
    }
}

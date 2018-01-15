import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.sql.Driver;

/**
 * Created by ioana on 15/01/2018.
 */
public class SeleniumTest {
    WebDriver driver;

    @FindBy(id = "next-arrow")
    private static WebElement arraw;

    @FindBy(id = "submit")
    private static WebElement canvas;

    @FindBy(id = "translate-word")
    private static WebElement word;


    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "..\\selenium-driver\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        driver.get("http://localhost:5000/html/index.html");
//        WebDriverWait wait = new WebDriverWait(driver, 100);
//        WebElement arrow =
//                (new WebDriverWait(driver, 20)).until(ExpectedConditions.presenceOfElementLocated(By.id("next-arrow")));
//     WebElement translation = driver.findElement(By.id("translated-word"));
//   word.click();

        driver.switchTo().frame(driver.findElement(By.tagName("iframe")));
        Thread.sleep(5000);
        WebElement canvas = driver.findElement(By.id("canvas"));

        Actions builder = new Actions(driver);
        builder.clickAndHold(canvas).moveByOffset(10, 50).
                moveByOffset(50,10).
                moveByOffset(-10,-50).
                moveByOffset(-50,-10).release().perform();
        Thread.sleep(5000);

//        WebElement submitButton = driver.findElement(By.id("submit"));

//     metoda1:   submitButton.click();

//     metoda2:   submitButton.sendKeys(Keys.ENTER);

//     metoda3:    Actions builder2 = new Actions(driver);
//        builder2.click(submitButton).perform();
//        Thread.sleep(3000);;
//        builder2.release().perform();

        driver.switchTo().defaultContent();
        JavascriptExecutor js = ((JavascriptExecutor) driver);
        js.executeScript("window.scrollTo(0, document.body.scrollHeight)");

        Thread.sleep(5000);

        driver.findElement(By.id("quiz-button")).click();

        Thread.sleep(5000);



        driver.quit();


//        JavascriptExecutor jse = (JavascriptExecutor) driver;
//        //Scroll vertically downward by 250 pixels
//        jse.executeScript("window.scrollBy(0,250)", "");
//        Thread.sleep(1000);
    }

    public static void testTitle(WebDriver driver) throws InterruptedException {
        String expectedTitle = "ASLE";
        String actualTitle = "";
        actualTitle = driver.getTitle();
        Thread.sleep(5000);  // Let the user actually see something!


        if (actualTitle.contentEquals(expectedTitle)) {
            System.out.println("Test Passed!");
        } else {
            System.out.println("Test Failed");
        }

        driver.quit();
    }

}

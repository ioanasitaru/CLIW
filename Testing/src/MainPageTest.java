import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

/**
 * Created by ioana on 15/01/2018.
 */
public class MainPageTest {
    WebDriver driver;

    @FindBy(id = "next-arrow")
    private static WebElement arraw;

    @FindBy(id = "translate-word")
    private static WebElement word;

    @FindBy(id = "main-title")
    private WebElement title;

    @FindBy(id = "result")
    private WebElement result;

    @FindBy(id = "canvas")
    private WebElement canvas;

    @FindBy(id = "submit")
    private WebElement submitButton;


    @Before
    public void setup() {
        System.setProperty("webdriver.chrome.driver", "..\\selenium-driver\\chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:5000/html/index.html");
        driver.switchTo().defaultContent();
    }

    @After
    public void tearDown() throws InterruptedException {
        driver.manage().deleteAllCookies();
        driver.quit();
    }

    @Test
    public void testTitle() throws InterruptedException {
        String expectedTitle = "ASLE";
        String actualTitle = "";
        actualTitle = driver.getTitle();
        Thread.sleep(5000);  // Let the user actually see something!

        assert (actualTitle.contentEquals(expectedTitle));
    }

    public void draw() {
        WebElement canvas = driver.findElement(By.id("canvas"));

        Actions builder = new Actions(driver);
        builder.clickAndHold(canvas).moveByOffset(10, 50).
                moveByOffset(50, 10).
                moveByOffset(-10, -50).
                moveByOffset(-50, -10).release().perform();
    }

    @Test
    public void openPage() {
        WebElement title = driver.findElement(By.id("main-title"));
        Assert.assertTrue(title.isDisplayed());
    }

    @Test
    public void canvasDisplayResult() throws InterruptedException {
        driver.switchTo().frame(driver.findElement(By.tagName("iframe")));
        Thread.sleep(5000);

        this.draw();

        Thread.sleep(5000);
        WebElement submitButton = driver.findElement(By.id("submit"));

//     metoda1:
//      submitButton.click();
//     metoda2:
//     submitButton.sendKeys(Keys.ENTER);
//     metoda3:
        Actions builder2 = new Actions(driver);
        builder2.click(submitButton).perform();
        Thread.sleep(3000);
        builder2.release().perform();

        WebElement result = driver.findElement(By.id("result"));
        System.out.println(result.getText());
        Assert.assertTrue(result.getText().length() != 0);
    }


    @Test
    public void canvasDoesNotDisplayResultForLongerThan4000() throws InterruptedException {
        driver.switchTo().frame(driver.findElement(By.tagName("iframe")));
        Thread.sleep(5000);

        this.draw();

        Thread.sleep(5000);

        WebElement submitButton = driver.findElement(By.id("submit"));

        submitButton.sendKeys(Keys.ENTER);

        WebElement result = driver.findElement(By.id("result"));
        System.out.println(result.getText());
        Thread.sleep(4100);
        Assert.assertTrue(result.getText().length() == 0);
    }

    @Test
    public void canvasClearResetsScore() throws InterruptedException {
        driver.switchTo().frame(driver.findElement(By.tagName("iframe")));
        Thread.sleep(5000);

        this.draw();

        Thread.sleep(5000);
        WebElement clearButton = driver.findElement(By.className("clear-canvas"));

        clearButton.click();

        WebElement submitButton = driver.findElement(By.id("submit"));
        submitButton.click();
        Thread.sleep(1000);


        WebElement result = driver.findElement(By.id("result"));
        System.out.println(result.getText());
        Assert.assertTrue(result.getText().contains(": 0!"));
    }

    public void openQuizModule() throws InterruptedException {
        driver.switchTo().defaultContent();
        JavascriptExecutor js = ((JavascriptExecutor) driver);
        js.executeScript("window.scrollTo(0, document.body.scrollHeight)");


        Thread.sleep(5000);

        driver.findElement(By.id("quiz-button")).click();

        Thread.sleep(5000);
    }

    @Test
    public void loadQuizModuleProperly() throws InterruptedException {
        this.openQuizModule();

        driver.switchTo().frame(driver.findElement(By.tagName("iframe")));

        WebElement actualSubtitle = driver.findElement(By.id("title"));

        String expectedSubtitle = "Quick Quiz";
        assert (actualSubtitle.getText().contentEquals(expectedSubtitle));

    }


    @Test
    public void verifyQuizSelectionOneCoicePerQuestion() throws InterruptedException {
        this.openQuizModule();

        driver.switchTo().frame(driver.findElement(By.tagName("iframe")));

        List<WebElement> radioButton = driver.findElements(By.tagName("input"));
        System.out.println(radioButton.size());
        //If u want to select the radio button
        radioButton.get(0).click();
        Thread.sleep(3000);

        radioButton.get(1).click();
        Thread.sleep(3000);

        Assert.assertFalse(radioButton.get(0).isSelected());
        //If u want the Text in U R console

    }

    @Test
    public void verifyQuizResult() throws InterruptedException {
        this.openQuizModule();

        driver.switchTo().frame(driver.findElement(By.tagName("iframe")));

        List<WebElement> radioButton = driver.findElements(By.tagName("input"));

        radioButton.get(0).click();
        Thread.sleep(3000);

        WebElement nextButton = driver.findElement(By.id("next"));
        nextButton.click();
        Thread.sleep(1000);

        radioButton.get(3).click();
        Thread.sleep(3000);

        nextButton.click();
        Thread.sleep(1000);

        radioButton.get(6).click();
        Thread.sleep(3000);

        WebElement submitButton = driver.findElement(By.id("submit"));
        submitButton.click();
        Thread.sleep(3000);

        WebElement result = driver.findElement(By.id("results"));
        Assert.assertTrue(result.getText().length() != 0);
        //If u want the Text in U R console

    }

    @Test
    public void verifyNavbarLinks() throws InterruptedException {

        WebElement progress = driver.findElement(By.id("progress"));
        Thread.sleep(5000);
        progress.click();
        Thread.sleep(5000);
        Assert.assertTrue(driver.findElement(By.className("twitter")).isDisplayed());

        WebElement practice = driver.findElement(By.id("practice"));
        practice.click();

        Thread.sleep(5000);
        WebElement title = driver.findElement(By.id("main-title"));
        Assert.assertTrue(title.isDisplayed());
        Thread.sleep(5000);

        WebElement home = driver.findElement(By.id("home"));
        home.click();
        Thread.sleep(5000);
        Assert.assertTrue(driver.findElement(By.id("title")).isDisplayed());

    }


}

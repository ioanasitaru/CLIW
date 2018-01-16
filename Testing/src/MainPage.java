import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;

/**
 * Created by ioana on 16/01/2018.
 */
public class MainPage {
    private WebDriver driver;

    @FindBy(id = "main-title")
    private WebElement title;



    public boolean isOpened() {
        return title.isDisplayed();
    }

    public boolean getCanvasResult() throws InterruptedException {

        driver.switchTo().frame(driver.findElement(By.tagName("iframe")));
        Thread.sleep(5000);
        WebElement canvas = driver.findElement(By.id("canvas"));

        Actions builder = new Actions(driver);
        builder.clickAndHold(canvas).moveByOffset(10, 50).
                moveByOffset(50,10).
                moveByOffset(-10,-50).
                moveByOffset(-50,-10).release().perform();
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


        System.out.println(result.getText());
        if(result.getText().length() != 0)
            return true;
        else
            return false;
    }
}

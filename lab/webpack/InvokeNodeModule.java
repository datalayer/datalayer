import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;
import javax.script.Invocable;
 
public class InvokeNodeModule {

    public static void main(String[] args) throws Exception {

        // Create a script engine manager.
        ScriptEngineManager factory = new ScriptEngineManager();
        
        // Create JavaScript engine.
        ScriptEngine engine = factory.getEngineByName("nashorn");
        
        // Evaluate JavaScript code from given file.
        engine.eval(new java.io.FileReader("./src/nashorn-polyfill.js"));
        engine.eval(new java.io.FileReader("./lib/@datalayer/datalab-webpack.js"));
/*
        Invocable invocable = (Invocable) engine;
        Object result = invocable.invokeFunction("sayHello", "java");
        System.out.println(result);
        System.out.println(result.getClass());
*/
    }

}

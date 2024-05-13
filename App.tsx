import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Button, Text } from 'react-native-paper';
import { useState } from 'react';

export default function App() {
    const [result, setResult] = useState<string>("");
    const [expression, setExpression] = useState<string>("");
    const [operation, setOperation] = useState<string>("");

    const POSSIBLE_OPERATIONS = ["+", "-", "*", "/"];

    function addNumberToExpression(value: string) {
        setExpression(expression + value);
    }

    function expressionContainsOperation() {
        return expression.split("").some(c => POSSIBLE_OPERATIONS.includes(c));
    }

    function addOperationToExpression(operand: string) {
        if (!expression || expressionContainsOperation()) return;

        setExpression(expression + operand);
        setOperation(operand);
    }

    function calculate() {
        if (!operation || POSSIBLE_OPERATIONS.includes(expression.at(-1)!)) {
            return;
        }

        const [firstNumber, secondNumber] = expression.split(operation).map(v => Number(v));

        switch(operation) {
            case "+":
                setResult((firstNumber + secondNumber).toString());
                break;
            case "-":
                setResult((firstNumber - secondNumber).toString());
                break;
            case "*":
                setResult((firstNumber * secondNumber).toString());
                break;
            case "/":
                setResult((firstNumber / secondNumber).toString());
                break;
        }

    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                {result ? <Text>{result}</Text> : <Text>{expression}</Text>}

                <View style={{ flexDirection: 'row' }}>
                    <Button onPress={() => addNumberToExpression("1")}>1</Button> 
                    <Button onPress={() => addNumberToExpression("2")}>2</Button> 
                    <Button onPress={() => addNumberToExpression("3")}>3</Button> 
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Button onPress={() => addNumberToExpression("4")}>4</Button> 
                    <Button onPress={() => addNumberToExpression("5")}>5</Button> 
                    <Button onPress={() => addNumberToExpression("6")}>6</Button> 
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Button onPress={() => addNumberToExpression("7")}>7</Button> 
                    <Button onPress={() => addNumberToExpression("8")}>8</Button> 
                    <Button onPress={() => addNumberToExpression("9")}>9</Button> 
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Button onPress={() => addNumberToExpression("0")}>0</Button> 
                    <Button onPress={() => addOperationToExpression("+")}>+</Button> 
                    <Button onPress={() => addOperationToExpression("-")}>-</Button> 
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Button onPress={() => addOperationToExpression("*")}>*</Button> 
                    <Button onPress={() => addOperationToExpression("/")}>/</Button> 
                    <Button onPress={calculate}>=</Button> 
                </View>

                <Button onPress={() => {
                    setExpression("");
                    setResult("");
                    setOperation("");
                }}>Limpar</Button> 

                <StatusBar/>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

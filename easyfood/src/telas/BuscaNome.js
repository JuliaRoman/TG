import React, {Component, useState} from 'react';
import { Image, TextInput, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

export default function BuscaNome(){

    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const recipeResponse = async () => {
        try {
          const res = await axios.post(
            "https://api.openai.com/v1/engines/text-davinci-003/completions",
            {
              prompt: input,
              temperature: 0.3,
              max_tokens: 300,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
            },
            {
              headers: {
                Authorization: `Bearer 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`,
                "Content-Type": "application/json",
              },
            }
          );
          setResponse(res.data.choices[0].text);
        } catch (err) {
          console.error(err);
        }
      };

    const navigation = useNavigation();

    function handleReceita() {
        navigation.navigate('Receita');
    }

    return (
        <SafeAreaView>
            <Image style={styles.imgTitulo} source={require('../../assets/img_busca_por_nome.png')} />
            
            <TextInput style = {styles.input} placeholder="Insira o nome da receita" 
            onChangeText={(text) => setInput(text)}
            value={input}
            
            />
            <Text style = {styles.button} onPress={recipeResponse}>Buscar</Text>
            <View style={styles.responseContainer}>
                <Text style={styles.responseText}>{response}</Text>
            </View>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor: '#5B5B5B',
        marginLeft: 50,
        marginBottom: 20,
        marginRight: 50,
        fontSize: 16,
        paddingStart: 20,
        color: '#5B5B5B',
        borderRadius: 50,
        height: 50,
    },
    imgTitulo:{
        alignSelf:'center',
        marginTop:100,
        marginBottom:50,
        width:292,
    },
    button: {
        backgroundColor: '#E7320E',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        borderRadius: 50,
        height: 50,
        marginLeft: 50,
        marginBottom: 5,
        marginRight: 50,
        paddingTop: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    responseContainer: {
        marginHorizontal: 20,
    },
    responseText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});


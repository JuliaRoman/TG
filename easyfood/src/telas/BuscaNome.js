import React, {useState, Component} from 'react';
import { Image, TextInput, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function BuscaNome(){

  const [input, setInput] = useState("");

  const navigation = useNavigation();

  const recipeResponse = async () => {
      try {
        const res = await axios.post(
          "https://api.openai.com/v1/engines/text-davinci-003/completions",
          {
            prompt: "me dê apenas uma receita existente (em formato de receita), descreva o sabor e apresente sua instrução com o titulo [ "+ input + " ].\n Caso seja inserido algo que possa ferir os direitos humanos, diga que isso é proíbido. \n Se não foi inserido um nome de receita ou foi inserido um texto sem nexo com o assunto, então avise que não foi passado uma receita válida e não dê uma receita.\nCaso não tenha nenhuma receita já existente que use apenas esses ingredientes como principal, indique outra receita com ingredientes similares ou deixe claro que não existe uma receita e sobre a questão disso na saúde.",
            temperature: 0.3,
            max_tokens: 600,
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
        console.log("O valor input foi: " + input + " com o tipo :" + typeof(input));
        console.log("A resposta: " + res.data.choices[0].text + "\n e o tipo é: " + typeof(res.data.choices[0].text));
        handleReceita(res.data.choices[0].text);
      } catch (err) {
        console.error(err);
      }
    };

    

    function handleReceita(finalResponse) {
        console.log("\n\ntransportando.... : " + finalResponse);
        navigation.navigate('Receita', {response: finalResponse});
    }

    return (
        <SafeAreaView>
            <Image style={styles.imgTitulo} source={require('../../assets/img_busca_nome.png')} />
            <TextInput style = {styles.input} placeholder="Insira o nome da receita" onChangeText={(text) => setInput(text)} />
            <Text style = {styles.button} onPress={recipeResponse}>Buscar</Text>
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
        maxWidth: 310,
        height: 120,
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
});


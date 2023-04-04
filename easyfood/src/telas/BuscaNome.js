import axios from "axios";
import React, {useState} from 'react';
import { Image, TextInput, StyleSheet, SafeAreaView, Text } from 'react-native';

export default function BuscaNome(){

  const [input, setInputValue] = useState("");
  const [response, setResponse] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${input}&maxFat=25&number=1`,
        {
          params: {
            //ingredients: inputValue,
            apiKey: "ba7842acbb4e40e5939a05915d5c2c19",
          },
        }
      );
      console.log(response.data.results[0]);
      setResponse(response.data.results[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
        <Image style={styles.imgTitulo} source={require('../../assets/img_busca_por_nome.png')} />
        <TextInput 
          style = {styles.input} 
          placeholder="Insira o nome da receita"
          onChangeText={(text) => setInputValue(text)}
        />
        <Text style = {styles.button} onPress={handleSearch}>Buscar</Text>
        {response && <Text style={styles.response}>{response.title}</Text>}
        {response && <Text style={styles.response}>{response.title}</Text>}
        
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
  response: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
  }
});

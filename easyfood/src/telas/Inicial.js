import React from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, Button, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//import CheckBox from './src/componentes/Checkbox';


export default function Inicial(){

    /*const navigation = setNavigation();**/

    /*const [check, setCheck] = useState(false)

    function handleCheck() {
        setCheck(!check);
    }*/
    const navigation = useNavigation();

    function handleCadastro() {
        navigation.navigate('Cadastro');
    }

    function handleBuscaNome() {
        navigation.navigate('BuscaNome');
    }

    return (
        <SafeAreaView>
            <Text style = {styles.chamada}>Bem vindo ao</Text>
            <Text style = {styles.titulo}>Easy Food</Text>
            <TextInput style = {styles.input} placeholder="Digite seu e-mail" />
            <TextInput style = {styles.input} placeholder="Digite sua senha" />
            
            {/*<CheckBox label="Li e concordo com os Termos e Políticas de Privacidade." labelStyle={{ color: '#fff', fontSize: 16 }}
                iconColor="#fff"
                checkColor="#fff"
                value={check}
                onChange={handleCheck}
            />*/}
            {/*<Button title="Entrar" style = {styles.botao} onPress={() => navigation.navigate('')}/>*/}
            <Text style = {styles.botao} onPress={handleBuscaNome}>Entrar</Text>
            <Text style = {styles.mensagem}>Ainda não possui conta?<Text style = {styles.cadastrar} onPress={handleCadastro}> Cadastrar</Text></Text>    
            
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    chamada: {
        fontWeight:'500',
        fontSize: 24,
        marginTop: 150,
        marginLeft: 50,
        color: '#5B5B5B',
    },
    titulo: {
        fontWeight:'900',
        color: '#E7320E',
        fontSize: 40,
        marginLeft: 50,
        marginBottom: 200,
    },
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
    aviso:{
        fontWeight:'500',
        color: '#3E3E3E',
        fontSize: 11,
        marginLeft: 40,
    },
    botao:{
        backgroundColor: '#E7320E',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        borderRadius: 50,
        height: 50,
        marginLeft: 50,
        marginBottom: 5,
        marginRight: 50,
        textAlign:'center',
        paddingTop: 12.5,
        textTransform: 'uppercase',
    },
    mensagem:{
        color: '#3E3E3E',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 50,
        marginBottom: 20,
        marginRight: 50,
        textAlign:'center',
    },
    cadastrar:{
        color: '#E7320E',
        fontSize: 14,
        fontWeight: '500',
    },
});


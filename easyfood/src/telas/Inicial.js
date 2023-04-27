import React from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, Alert, Button, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from 'firebase/auth';
import { FirebaseError, initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase-config';


//import CheckBox from './src/componentes/Checkbox';


export default function Inicial(){

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailCadastro, setEmailCadastro] = React.useState('');
    const [passwordCadastro, setPasswordCadastro] = React.useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Signed in!');
            const user = userCredential.user;
            console.log(user);
            handleBuscaNome();
        })
        .catch(error => {
            console.log(error);
            alert(error.message);
            Alert.alert(error.message);
        })
    }


    const AlertCadastrar = () =>
    Alert.alert('Quase lá!', 'Continue o cadastro na próxima tela, apresentando suas restrições alimentares!', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleCadastro(emailCadastro, passwordCadastro)},
    ]);



    /*const navigation = setNavigation();**/

    /*const [check, setCheck] = useState(false)

    function handleCheck() {
        setCheck(!check);
    }*/
    const navigation = useNavigation();

    function handleCadastro(email,password) {
        console.log(typeof(email))
        console.log("cadastro", email, password);
        navigation.navigate('Cadastro',{emailResponse: email, passwordResponse: password});
        console.log("passou pelo handleCadastro");
    }

    function handleBuscaNome() {
        navigation.navigate('BuscaNome');
    }

    function handleBuscaIngrediente() {
        navigation.navigate('BuscaIngrediente');
    }

    return (
        <SafeAreaView>
            <Text style = {styles.chamada}>Bem vindo ao</Text>
            <Text style = {styles.titulo}>Easy Food</Text>
            <TextInput onChangeText={(text) => setEmail(text)} style = {styles.input} placeholder="Digite seu e-mail" />
            <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={true} style = {styles.input} placeholder="Digite sua senha" />
            
            {/*<CheckBox label="Li e concordo com os Termos e Políticas de Privacidade." labelStyle={{ color: '#fff', fontSize: 16 }}
                iconColor="#fff"
                checkColor="#fff"
                value={check}
                onChange={handleCheck}
            />*/}
            {/*<Button title="Entrar" style = {styles.botao} onPress={() => navigation.navigate('')}/>*/}
            <Text style = {styles.botao} onPress={handleSignIn}>Entrar</Text>
            <Text style = {styles.mensagem}>Ainda não possui conta?</Text>    

            <TextInput style = {styles.input} placeholder="Insira seu nome" />
            <TextInput onChangeText={(text) => setEmailCadastro(text)} style = {styles.input} placeholder="Insira seu e-mail" />
            <TextInput onChangeText={(text) => setPasswordCadastro(text)} secureTextEntry={true} style = {styles.input} placeholder="Insira uma nova senha" />
            <Text style = {styles.botao} onPress={AlertCadastrar}>Cadastrar</Text>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    chamada: {
        fontWeight:'500',
        fontSize: 24,
        marginTop: 75,
        marginLeft: 50,
        color: '#5B5B5B',
    },
    titulo: {
        fontWeight:'900',
        color: '#E7320E',
        fontSize: 40,
        marginLeft: 50,
        marginBottom: 70,
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
        marginTop: 15,
        marginLeft: 50,
        marginBottom: 20,
        marginRight: 50,
        textAlign:'center',
    },
});


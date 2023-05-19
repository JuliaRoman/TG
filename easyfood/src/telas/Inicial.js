import React from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, Alert, Button, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from 'firebase/auth';
import { FirebaseError, initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase-config';
// import auth  from '@react-native-firebase/auth';
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin';


import 'expo-dev-client';



//import CheckBox from './src/componentes/Checkbox';


export default function Inicial(){

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailCadastro, setEmailCadastro] = React.useState('');
    const [passwordCadastro, setPasswordCadastro] = React.useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // googleLogin = async () => {
    //     try {
    //       const result = await Expo.Google.logInAsync({
    //         androidClientId: "368031575868-es4c6i7m07qluetbv1es96l2keqvec01.apps.googleusercontent.com",
    //         //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
    //         scopes: ["profile", "email"]
  
    //       })
    //       if (result.type === "success") {
    //         const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
    //            firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(result){
    //              console.log(result);
    //            });
    //    this.props.navigation.navigate('Where you want to go');
    //  } else {
    //    console.log("cancelled")
    //  }
    //     } catch (e) {
    //       console.log("error", e)
    //     }
    // }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Signed in!');
            const user = userCredential.user;
            console.log(user);
            handleBuscaIngrediente();
        })
        .catch(error => {
            console.log(error.code);
            console.log("teste");
            console.log(error);
            switch (error.code) {
                case 'auth/user-not-found':
                    console.log("entrou, usuário não encontrado.");
                    Alert.alert('Usuário não encontrado!', 'Não foi encontrado um usuário com essas credenciais',{text: 'Voltar'});
                    break;
                
                case "auth/invalid-email":
                    Alert.alert('Email invalido!', 'Insira um email válido!', [
                        {text: 'Corrigir!'},
                        ]);
                    break;

                case "auth/missing-password":
                    Alert.alert('Senha inválida!', 'Insira uma senha válida!', [
                        {text: 'Voltar!'},
                        ]);
                    break;
                    
                case "auth/wrong-password":
                    Alert.alert('Senha incorreta!', 'A senha não corresponde ao usuário!', [
                        {text: 'Voltar!'},
                        ]);
                    break;

                default:
                    Alert.alert('Erro de conexão!', 'Verifique sua conexão com a internet!', [
                        {text: 'Voltar'},
                      ]);
                      break;

            }

        })
    }


    const AlertCadastrar = () =>
    Alert.alert('Quase lá!', 'Continue o cadastro na próxima tela, apresentando suas restrições alimentares!', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleCadastro()},
    ]);

    const ferramentaFutura = () => {
        Alert.alert('Chegando...', 'Logo você poderá se registrar e entrar usando sua conta Google!', [
            {text: 'Voltar'},
          ]);
    }

    /*const navigation = setNavigation();**/

    /*const [check, setCheck] = useState(false)

    function handleCheck() {
        setCheck(!check);
    }*/
    const navigation = useNavigation();

    function handleCadastro() {
        navigation.navigate('Cadastro' /*, {emailResponse: email, passwordResponse: password}*/);
        console.log("passou pelo handleCadastro");
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
            <Text style = {styles.mensagem}>Ou</Text>
            <TouchableOpacity style={[styles.flex, styles.btnGoogle]} onPress={ferramentaFutura}> 
                <Image style = {styles.imgGoogle} source={require('../../assets/icon_google.png')} />
                <Text style = {styles.txtGoogle}> Chegando em breve...</Text>
            </TouchableOpacity>
            <Text style = {styles.mensagem}>Ainda não possui conta? <Text style = {styles.destaque} onPress={AlertCadastrar}>Cadastre-se aqui!</Text></Text>    

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
    destaque: {
        fontWeight:'900',
        color: '#E7320E',
    },
    imgGoogle:{
        alignSelf:'center',
        maxWidth: 25,
        height: 25,
    },
    txtGoogle:{
        color: '#3E3E3E',
        fontSize: 14,
        fontWeight: '500',
        textAlign:'center',
        paddingLeft:20,
        verticalAlign: 'middle',
    },
    btnGoogle:{
        borderWidth:1,
        borderRadius: 50,
        height: 50,
        borderColor: '#5B5B5B',
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
    flex:{
        flexDirection: 'row',
        justifyContent:'center',
        marginLeft:50,
        marginRight: 50,
    },
});


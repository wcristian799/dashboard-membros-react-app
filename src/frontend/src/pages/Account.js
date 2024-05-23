import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

function Account() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const userId = localStorage.getItem('userId'); // Recupera o userId do localStorage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://membros.tanayoupop.com.br/src/backend/Controllers/UserController.php?userId=${userId}`);
                if (response.data && response.data.name && response.data.email) {
                    setName(response.data.name);
                    setEmail(response.data.email);
                } else {
                    throw new Error('Dados incompletos');
                }
                console.log(response.data); // Log da resposta da API
            } catch (error) {
                console.error(error); // Log de erro no console
                toast({
                    title: "Erro",
                    description: "Não foi possível carregar os dados do usuário: " + error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };
        fetchData();
    }, [toast, userId]); // Adiciona userId nas dependências do useEffect

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://membros.tanayoupop.com.br/src/backend/Controllers/UserController.php', {
                userId, // Envio do userId junto com os dados de atualização
                name,
                email,
                password
            });
            console.log(response.data); // Log da resposta da API
            toast({
                title: "Atualizado",
                description: "Dados atualizados com sucesso!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error); // Log de erro no console
            toast({
                title: "Erro",
                description: "Falha ao atualizar os dados: " + error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={5}>
            <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
            </FormControl>
            <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} isReadOnly placeholder="Seu email" />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Senha Nova</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite uma nova senha" />
            </FormControl>
            <Button mt={4} colorScheme="blue" isLoading={loading} onClick={handleUpdate}>Atualizar</Button>
        </Box>
    );
}

export default Account;

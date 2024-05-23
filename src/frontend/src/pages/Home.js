import React, { useState } from 'react';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';  // Importe useNavigate

function Home() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();  // Inicializa o navigate

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/mercado-pago');  // Redireciona para '/redirect' após a operação
    }, 0); // Simula o tempo de conexão
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgImage="url('https://sebraemg.com.br/wp-content/uploads/2022/09/Imagem-Texto-1-Blog-Sebrae.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      fontFamily="Poppins, sans-serif"  // Define a fonte Poppins
    >
      {/* Overlay roxo com transparência */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="purple.800"
        opacity="0.7"  // Ajuste a transparência conforme necessário
      />

      <Box
        p={8}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
        width={{ base: '80%', md: '40%' }}  // Ajusta a largura conforme necessário
        zIndex="docked"  // Garante que a caixa branca fique sobre o overlay
      >
        <VStack spacing={4}>
          <Text fontSize="3xl">
            Bem-vindo à Equipe <b>{localStorage.getItem('userName') || 'Usuário'}</b>
          </Text>
          <Text fontSize="lg" color="gray.600">
            Para receber sua comissão, esteja em dia com sua conta MercadoPago.
          </Text>
          <Button
            isLoading={isLoading}
            loadingText="Redirecionando"
            colorScheme="purple"
            onClick={handleConnect}
            size="lg"
            rightIcon={<ArrowForwardIcon />}  // Ícone adicionado ao botão
          >
            Conectar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default Home;

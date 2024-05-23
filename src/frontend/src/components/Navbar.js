import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Flex, Button, Link, useToast, Image } from '@chakra-ui/react';

function Navbar() {
  const role = localStorage.getItem('userRole');
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      toast({
        title: "Logout realizado.",
        description: "Você foi deslogado com sucesso.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate('/login');
      setLoading(false);
    }, 1000);
  };

  return (
    <Flex
      as="nav"
      position="relative"
      bgGradient="linear(to-r, purple.600, purple.500)"
      color="white"
      p={4}
      alignItems="center"
      justifyContent="space-between"
      fontFamily="Poppins, sans-serif"
      zIndex={99999}  // Um valor alto para garantir visibilidade máxima

    >
      <Image
        src="https://app.tanayoupop.com.br/assets/img/logos/logo.png?v=1677859874mFhur"
        alt="Logotipo da empresa"
        htmlWidth="150px"  
      />
      <Flex as="ul" listStyleType="none" alignItems="center" gap={2}>
        {role === 'ADMIN' ? (
          <>
            <Link as={RouterLink} to="/dashboard" p={2} minWidth="120px">Início</Link>
            <Link as={RouterLink} to="/user-management" p={2} minWidth="180px">Gerenciar Usuários</Link>
            <Link as={RouterLink} to="/group-management" p={2} minWidth="180px">Gerenciar Grupos</Link>
            <Link as={RouterLink} to="/account" p={2} minWidth="140px">Minha Conta</Link>
          </>
        ) : (
          <>
            <Link as={RouterLink} to="/home" p={2} minWidth="100">Início</Link>
            <Link as={RouterLink} to="/account" p={2} minWidth="140px">Minha Conta</Link>
            <Link as={RouterLink} to="/mercado-pago" p={2} minWidth="220px">Conexão MercadoPago</Link>
            <Link as={RouterLink} to="/financial-statement" p={2} minWidth="200px">Extrato Financeiro</Link>
          </>
        )}
        <Button
          onClick={handleLogout}
          colorScheme="purple.600"
          bgGradient="linear(to-r, purple.600, purple.500)"
          isLoading={isLoading}
          loadingText="Deslogando"
          minWidth="120px"
        >
          Deslogar
        </Button>
      </Flex>
    </Flex>
  );
}

export default Navbar;

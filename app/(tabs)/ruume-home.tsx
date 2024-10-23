import React, { useCallback, useContext, useEffect } from 'react';
import { Button, View } from 'react-native';

import Settings from '@Ruume/assets/icons/settings.svg';
import { supabase } from '@Ruume/clients/supabase';
import { BaseText } from '@Ruume/ui';

import { StatusBar } from 'expo-status-bar';
import styled, { ThemeContext } from 'styled-components/native';

const StyledHomeContainer = styled(View)`
  height: 100%;
  background-color: black;
  padding: 16px;
`;

export default function RuumeHome() {
  const theme = useContext(ThemeContext);
  const userId = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }, []);

  useEffect(() => {
    userId().then((sess) => {
      console.log(sess);
    });
  }, [userId]);

  const mockSignOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <>
      <StyledHomeContainer>
        <StatusBar style="light" />
        <BaseText type="default" style={{ color: theme?.text }}>
          Welcome to Ruume Home!
        </BaseText>
        <Settings width={24} height={24} fill="white" />
        <Button title="Sign Out" onPress={mockSignOut} />
      </StyledHomeContainer>
    </>
  );
}

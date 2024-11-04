import React, { useCallback, useContext } from 'react';
import { Button, View } from 'react-native';

import Settings from '@Ruume/assets/icons/settings.svg';
import { supabase } from '@Ruume/clients/supabase';
import { hasInitedProfileAtom } from '@Ruume/store/profile/hasInitedProfileAtom';
import { BaseText } from '@Ruume/ui';

import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAtomValue } from 'jotai';
import styled, { ThemeContext } from 'styled-components/native';

const StyledHomeContainer = styled(View)`
  height: 100%;
  background-color: black;
  padding: 16px;
`;

export default function RuumeHome() {
  const theme = useContext(ThemeContext);
  const hasInitedProfile = useAtomValue(hasInitedProfileAtom);

  const mockSignOut = useCallback(async () => {
    await supabase.auth.signOut({
      scope: 'local',
    });
  }, []);

  if (!hasInitedProfile) {
    return <Redirect href="/ruume-profile-setup" />;
  }

  return (
    <StyledHomeContainer>
      <StatusBar style="light" />
      <BaseText type="default" style={{ color: theme?.text }}>
        Welcome to Ruume Home!
      </BaseText>
      <Settings width={24} height={24} fill="white" />
      <Button title="Sign Out" onPress={mockSignOut} />
    </StyledHomeContainer>
  );
}

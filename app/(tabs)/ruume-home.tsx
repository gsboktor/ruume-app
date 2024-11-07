import React, { useCallback, useContext } from 'react';
import { Button, FlatList, Image, View } from 'react-native';

import Settings from '@Ruume/assets/icons/settings.svg';
import { supabase } from '@Ruume/clients/supabase';
import { useGetProfileById, useGetSession } from '@Ruume/hooks';
import { useGetAvatar } from '@Ruume/hooks/useGetAvatar';
import { BaseText } from '@Ruume/ui';

import { StatusBar } from 'expo-status-bar';
import styled, { ThemeContext } from 'styled-components/native';

const StyledHomeContainer = styled(View)`
  height: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme?.background};
`;

export default function RuumeHome() {
  const theme = useContext(ThemeContext);

  const { data: session } = useGetSession();
  const { data: profile } = useGetProfileById(session?.user?.id);
  const { data: avatar, isPending: avatarLoading } = useGetAvatar(profile?.data?.[0]?.avatar_url);

  const mockSignOut = useCallback(async () => {
    await supabase.auth.signOut({
      scope: 'local',
    });
  }, []);

  return (
    <StyledHomeContainer>
      <StatusBar style="light" />
      <BaseText type="default" style={{ color: theme?.text }}>
        Welcome to Ruume Home!
      </BaseText>

      <Settings width={24} height={24} fill="white" />
      <Button title="Sign Out" onPress={mockSignOut} />
      {!avatarLoading && avatar && (
        <FlatList
          data={Array.from({ length: 10 })}
          renderItem={({ index }) => (
            <Image
              key={index}
              style={{ width: 275, height: 275, alignSelf: 'center' }}
              source={{ uri: avatar + `?${Date.now()}`, cache: 'reload' }}
            />
          )}
        />
      )}
    </StyledHomeContainer>
  );
}

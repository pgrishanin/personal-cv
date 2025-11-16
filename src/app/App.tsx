import { AppNavigator } from '@app/navigation/AppNavigator';
import '@shared/i18n/i18n';
import React from 'react';

import { Provider } from '@shared/components/chakra';
import '@shared/theme/main.less';

function App(): React.JSX.Element {
    return (
        <Provider>
            <AppNavigator />
        </Provider>
    );
}

export default App;

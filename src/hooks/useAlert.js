import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar alertas modales
 * 
 * Uso:
 * const { alertState, showAlert, hideAlert, AlertModalComponent } = useAlert();
 * 
 * // Mostrar alerta
 * showAlert('Mensaje aquí', 'success'); // success | error | warning | info
 * 
 * // En el JSX
 * return (
 *   <>
 *     <AlertModalComponent />
 *     ... resto del componente
 *   </>
 * );
 */
export function useAlert() {
    const [alertState, setAlertState] = useState({
        isOpen: false,
        message: '',
        type: 'info',
        title: ''
    });

    const showAlert = useCallback((message, type = 'info', title = '') => {
        setAlertState({
            isOpen: true,
            message,
            type,
            title
        });
    }, []);

    const hideAlert = useCallback(() => {
        setAlertState(prev => ({ ...prev, isOpen: false }));
    }, []);

    return {
        alertState,
        showAlert,
        hideAlert
    };
}

export default useAlert;

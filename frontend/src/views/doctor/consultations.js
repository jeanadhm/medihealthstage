import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorChat = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null); // Docteur sélectionné
    const [messages, setMessages] = useState([]); // Messages avec le docteur sélectionné
    const [message, setMessage] = useState(''); // Message à envoyer

    // Configure Axios
    useEffect(() => {
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api'; // URL de base de votre API
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

        // Intercepteur pour rafraîchir automatiquement le token en cas d'expiration
        axios.interceptors.response.use(
            (response) => response, // Retourne directement la réponse si elle est valide
            async (error) => {
                const originalRequest = error.config;

                // Si le token a expiré, essayons de le rafraîchir
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        const response = await axios.post('/token/refresh/', { refresh: refreshToken });
                        const { access } = response.data;

                        // Mettre à jour le nouveau accessToken
                        localStorage.setItem('accessToken', access);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

                        // Rejoue la requête originale
                        return axios(originalRequest);
                    } catch (refreshError) {
                        console.error('Erreur lors du rafraîchissement du token', refreshError);
                        // Si le rafraîchissement échoue, redirige ou déconnecte
                        localStorage.clear();
                        window.location.href = '/login';
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    }, []);

    // Récupérer la liste des docteurs
    useEffect(() => {
        axios.get('/api/patients/')
            .then((response) => {
                setPatients(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des docteurs :', error);
            });
    }, []);

    // Récupérer les messages avec le docteur sélectionné
    useEffect(() => {
        if (selectedPatient) {
            axios.get(`/messages/?chat_with=${selectedPatient.id}`)
                .then((response) => {
                    setMessages(response.data);
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération des messages :', error);
                });
        }
    }, [selectedPatient]);

    // Envoyer un message
    const handleSendMessage = () => {
        if (message.trim() && selectedPatient) {
            const newMessage = {
                content: message, // Nom correspondant au champ dans votre serializer
                receiver: selectedPatient.id,
            };

            axios.post('/messages/send/', newMessage)
                .then((response) => {
                    setMessages((prevMessages) => [...prevMessages, response.data]);
                    setMessage('');
                })
                .catch((error) => {
                    console.error('Erreur lors de l\'envoi du message :', error);
                });
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h3 style={styles.heading}>Docteurs</h3>
                <ul style={styles.patientList}>
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <li
                                key={patient.id}
                                style={{
                                    ...styles.patientItem,
                                    backgroundColor: selectedPatient?.id === patient.id ? '#d3f8d3' : 'white',
                                }}
                                onClick={() => setSelectedPatient(patient)}
                            >
                                {patient.nom} {patient.prenoms}
                            </li>
                        ))
                    ) : (
                        <p style={styles.placeholder}>Aucun docteur disponible.</p>
                    )}
                </ul>
            </div>
            <div style={styles.chatBox}>
                {selectedPatient ? (
                    <>
                        <h3 style={styles.heading}>Conversation avec Dr. {selectedPatient.nom} {selectedPatient.prenoms}</h3>
                        <div style={styles.messages}>
    {messages.length > 0 ? (
        messages.map((msg, index) => {
            const isSenderDoctor = msg.sender === selectedPatient.id; // Condition pour savoir si c'est le docteur ou le patient
            return (
                <div
                    key={index}
                    style={
                        isSenderDoctor
                            ? styles.receivedMessage // Message reçu (docteur)
                            : styles.sentMessage // Message envoyé (patient)
                    }
                >
                    <p style={styles.text}>{msg.content}</p>
                    <div style={styles.messageFooter}>
                        <small style={styles.timestamp}>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                        <span style={styles.userLabel}>
                            {isSenderDoctor ? "Patient" : "Docteur"}
                        </span>
                    </div>
                </div>
            );
        })
    ) : (
        <p style={styles.placeholder}>Aucun message pour l'instant.</p>
    )}
</div>

                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Écrivez un message..."
                                style={styles.input}
                            />
                            <button onClick={handleSendMessage} style={styles.button}>Envoyer</button>
                        </div>
                    </>
                ) : (
                    <p style={styles.placeholder}>Sélectionnez un docteur pour commencer une conversation.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginTop: 100,
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
        width: '25%',
        borderRight: '1px solid #ccc',
        padding: '10px',
        overflowY: 'auto',
    },
    doctorList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    doctorItem: {
        padding: '10px',
        cursor: 'pointer',
        borderBottom: '1px solid #eee',
    },
    chatBox: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        overflowY: 'auto',
    },
    messages: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        height: '70%',
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#d1e7ff',
        padding: '10px',
        marginBottom: '5px',
        borderRadius: '10px',
        maxWidth: '60%',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f1f1f1',
        padding: '10px',
        marginBottom: '5px',
        borderRadius: '10px',
        maxWidth: '60%',
    },
    text: {
        margin: 0,
    },
    timestamp: {
        fontSize: '0.75em',
        color: '#888',
        textAlign: 'right',
    },
    inputContainer: {
        display: 'flex',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginRight: '5px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
    },
    placeholder: {
        textAlign: 'center',
        color: '#888',
        marginTop: '20px',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '10px',
        color: '#333',
    },
};

export default DoctorChat;
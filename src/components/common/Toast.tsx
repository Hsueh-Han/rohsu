import { useToastMessage } from '@/hooks/useToastMessage';

import '@/assets/scss/components/common/toast.scss';

function Toast() {
    const { messageList } = useToastMessage();

    return <div className="toast-wrap">
        {
            messageList.map((item) => (
                <div
                    className={`toast-item type-${item.type}`}
                    key={item.id}
                >
                    {item.content}
                </div>
            ))
        }
    </div>
};
export default Toast;
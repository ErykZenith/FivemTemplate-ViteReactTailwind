const post = async (
    eventName: string,
    data?: unknown,
) => {
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
    };

    const resourceName = (window as any).GetParentResourceName? (window as any).GetParentResourceName(): '';

    if (!resourceName) {
        return {}
    }

    const resp = await fetch(`https://${resourceName}/${eventName}`, options);

    const respFormatted = await resp.json();

    return respFormatted;
}

export default post
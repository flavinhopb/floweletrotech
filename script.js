document.getElementById('adicionarServico').addEventListener('click', function() {
    const descricao = document.getElementById('descricaoServico').value;
    const quantidade = parseFloat(document.getElementById('quantidadeServico').value);
    const valorUnitario = parseFloat(document.getElementById('valorUnitarioServico').value);
    const valorTotal = quantidade * valorUnitario;

    const li = document.createElement('li');
    li.textContent = `${descricao} | Quantidade: ${quantidade} | Valor Unitário: R$ ${valorUnitario.toFixed(2)} | Valor Total: R$ ${valorTotal.toFixed(2)}`;
    document.getElementById('listaServicos').appendChild(li);

    // Limpa os campos
    document.getElementById('descricaoServico').value = '';
    document.getElementById('quantidadeServico').value = '';
    document.getElementById('valorUnitarioServico').value = '';
});

document.getElementById('adicionarMaterial').addEventListener('click', function() {
    const descricao = document.getElementById('descricaoMaterial').value;
    const valorMaterial = parseFloat(document.getElementById('valorMaterial').value);

    const li = document.createElement('li');
    li.textContent = `${descricao} | Valor do Material: R$ ${valorMaterial.toFixed(2)}`;
    document.getElementById('listaMateriais').appendChild(li);

    // Limpa os campos
    document.getElementById('descricaoMaterial').value = '';
    document.getElementById('valorMaterial').value = '';
});

document.getElementById('previsualizarOrcamento').addEventListener('click', function() {
    // Esconde o formulário e mostra a pré-visualização
    document.getElementById('orcamento').style.display = 'none';
    document.getElementById('previsualizacao').style.display = 'block';

    // Preenche os dados do cliente na pré-visualização
    document.getElementById('prevNomeCliente').textContent = document.getElementById('nomeCliente').value;
    document.getElementById('prevTelefoneCliente').textContent = document.getElementById('telefoneCliente').value;
    document.getElementById('prevEmailCliente').textContent = document.getElementById('emailCliente').value;

    // Preenche os dados dos serviços na pré-visualização
    const corpoTabelaServicos = document.getElementById('corpoTabelaServicos');
    corpoTabelaServicos.innerHTML = ''; // Limpa a tabela antes de preenchê-la
    document.querySelectorAll('#listaServicos li').forEach(li => {
        const partes = li.textContent.split('|').map(item => item.trim());
        const descricao = partes[0];
        const quantidade = partes[1].split(': ')[1];
        const valorUnitario = partes[2].split(': ')[1];
        const valorTotal = partes[3].split(': ')[1];
        const row = corpoTabelaServicos.insertRow();
        row.insertCell(0).textContent = descricao;
        row.insertCell(1).textContent = quantidade;
        row.insertCell(2).textContent = valorUnitario;
        row.insertCell(3).textContent = valorTotal;
    });

    // Preenche os dados dos materiais na pré-visualização
    const corpoTabelaMateriais = document.getElementById('corpoTabelaMateriais');
    corpoTabelaMateriais.innerHTML = ''; // Limpa a tabela antes de preenchê-la
    document.querySelectorAll('#listaMateriais li').forEach(li => {
        const partes = li.textContent.split('|').map(item => item.trim());
        const descricao = partes[0];
        const valorMaterial = partes[1].split(': ')[1];
        const row = corpoTabelaMateriais.insertRow();
        row.insertCell(0).textContent = descricao;
        row.insertCell(1).textContent = valorMaterial;
    });

    // Calcula e preenche o valor total e o desconto
    const desconto = parseFloat(document.getElementById('desconto').value);
    let valorTotal = 0;

    document.querySelectorAll('#corpoTabelaServicos tr').forEach(tr => {
        valorTotal += parseFloat(tr.cells[3].textContent.replace('R$ ', ''));
    });

    document.querySelectorAll('#corpoTabelaMateriais tr').forEach(tr => {
        valorTotal += parseFloat(tr.cells[1].textContent.replace('R$ ', ''));
    });

    valorTotal -= desconto;
    document.getElementById('prevDesconto').textContent = desconto.toFixed(2);
    document.getElementById('prevValorTotal').textContent = valorTotal.toFixed(2);
});

document.getElementById('editarOrcamento').addEventListener('click', function() {
    // Volta para o formulário para edição
    document.getElementById('orcamento').style.display = 'block';
    document.getElementById('previsualizacao').style.display = 'none';
});

document.getElementById('gerarPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adiciona a logo da empresa (certifique-se de ter a imagem em formato base64)
    const logo = 'data:image/png;base64,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'; // Substitua pelo seu código base64
    doc.addImage(logo, 'PNG', 20, 10, 50, 20); // Parâmetros: imagem base64, tipo, X, Y, largura, altura

    // Adiciona as informações da empresa
 
    doc.setFontSize(10);
    doc.text('Telefone: (81) 99684-7246', 90, 20);
    doc.text('Email: contato@floweletrotech.com.br', 90, 25);
    doc.text('Site: www.floweletrotech.com.br', 90, 30);

    // Adiciona o título do documento
    doc.setFontSize(20);
    doc.text('Orçamento', 70, 50);

    doc.setFontSize(12);

    // Adiciona os dados do cliente
    doc.text(`Nome: ${document.getElementById('prevNomeCliente').textContent}`, 20, 60);
    doc.text(`Telefone: ${document.getElementById('prevTelefoneCliente').textContent}`, 20, 65);
    doc.text(`Email: ${document.getElementById('prevEmailCliente').textContent}`, 20, 70);

    // Adiciona as tabelas de serviços e materiais
    doc.setFontSize(14);
    doc.text('Serviços', 20, 120);
    doc.autoTable({ startY: 130, html: '#corpoTabelaServicos' });
    doc.setFontSize(14);
    doc.text('materiais', 20, doc.lastAutoTable.finalY + 10);
    doc.autoTable({ startY: doc.lastAutoTable.finalY + 20, html: '#corpoTabelaMateriais' });
   
    // Adiciona o desconto e o valor total
    doc.text(`Desconto: R$ ${document.getElementById('prevDesconto').textContent}`, 20, doc.lastAutoTable.finalY + 20);
    doc.text(`Valor Total: R$ ${document.getElementById('prevValorTotal').textContent}`, 20, doc.lastAutoTable.finalY + 30);

    // Salva o PDF
    doc.save('orcamento.pdf');
});


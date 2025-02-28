"use client";

import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

// Define o tipo dos dados da conferência
interface ConferenciaData {
  id: string;
  local: string;
  dataConferencia: string;
  responsavel: string;
  observacoes?: string;
  itens: {
    id: string;
    materialNome: string;
    status: "Conforme" | "NaoConforme";
    quantidade?: number;
    observacao?: string;
  }[];
}

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
    position: "relative", // para rodapé/cabeçalho absolutos
  },
  header: {
    position: "absolute",
    top: 15,
    left: 30,
    right: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 6,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 6,
    fontSize: 10,
    textAlign: "center",
  },
  content: {
    marginTop: 50, // espaço para header
    marginBottom: 50, // espaço para footer
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  table: {
    display: "flex",
    width: "auto",
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableHeaderRow: {
    backgroundColor: "#f0f0f0",
    borderBottomColor: "#ccc",
  },
  tableCell: {
    padding: 4,
    fontSize: 10,
    flexGrow: 1,
    // Ajuste flexBasis, flexGrow para colunas
  },
  tableHeaderCell: {
    fontWeight: "bold",
  },
  obsGeral: {
    marginTop: 10,
    fontStyle: "italic",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
});

function ConferenciaPdf({ data }: { data: ConferenciaData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Relatório de Conferência</Text>
          <Text style={{ fontSize: 10 }}>
            Documento gerado automaticamente - {new Date().toLocaleString()}
          </Text>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          {/* Dados gerais */}
          <View style={styles.section}>
            <Text style={styles.title}>Dados da Conferência</Text>
            <Text>Local: {data.local}</Text>
            <Text>Data: {data.dataConferencia}</Text>
            <Text>Responsável: {data.responsavel}</Text>
          </View>

          {/* Tabela de Itens */}
          <View>
            <Text style={styles.title}>Itens Conferidos</Text>
            <View style={styles.table}>
              {/* Cabeçalho da Tabela */}
              <View style={[styles.tableRow, styles.tableHeaderRow]}>
                <Text
                  style={[
                    styles.tableCell,
                    styles.tableHeaderCell,
                    { flex: 2 },
                  ]}
                >
                  Material
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.tableHeaderCell,
                    { flex: 1 },
                  ]}
                >
                  Status
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.tableHeaderCell,
                    { flex: 1 },
                  ]}
                >
                  Qtde
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.tableHeaderCell,
                    { flex: 2 },
                  ]}
                >
                  Observação
                </Text>
              </View>

              {/* Linhas da Tabela */}
              {data.itens.length === 0 ? (
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Nenhum item conferido</Text>
                </View>
              ) : (
                data.itens.map((item) => (
                  <View style={styles.tableRow} key={item.id}>
                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {item.materialNome}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {item.status === "Conforme" ? "Conforme" : "Não Conforme"}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {item.status === "NaoConforme" && item.quantidade != null
                        ? item.quantidade
                        : ""}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {item.status === "NaoConforme" && item.observacao
                        ? item.observacao
                        : ""}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>

          {/* Observação Geral (abaixo da tabela) */}
          {data.observacoes && data.observacoes.trim() !== "" && (
            <View style={styles.obsGeral}>
              <Text>Observação Geral: {data.observacoes}</Text>
            </View>
          )}
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={{ fontSize: 10 }}>
            © {new Date().getFullYear()} - Abner Oliveira
          </Text>
          <Text style={{ fontSize: 10 }}>Todos os direitos reservados</Text>
        </View>
      </Page>
    </Document>
  );
}

export function ConferenciaPdfDownload({ data }: { data: ConferenciaData }) {
  return (
    <PDFDownloadLink
      document={<ConferenciaPdf data={data} />}
      fileName={`conferencia-${data.id}.pdf`}
    >
      {({ loading }) =>
        loading ? "Gerando PDF..." : "Baixar Relatório em PDF"
      }
    </PDFDownloadLink>
  );
}

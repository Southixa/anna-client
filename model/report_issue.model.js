import gql from "graphql-tag";

const Report_issue = {
    insert: gql`
        mutation MyMutation($object: report_issue_insert_input = {}) {
        insert_report_issue_one(object: $object) {
          report_issue_id
        }
      }
    `,
    getAllByCustomerId: gql`
    query MyQuery($customer_id: uuid = "") {
  report_issue(where: {report_issue_customer_id: {_eq: $customer_id}}) {
    created_at
    report_issue_customer_id
    report_issue_date
    report_issue_detail
    report_issue_id
    report_issue_image
    report_issue_title
    updated_at
  }
}

    `,
    getOneByGmail: gql`
        query MyQuery($gmail: String = "") {
    customer(where: {customer_gmail: {_eq: $gmail}}) {
        created_at
        customer_district
        customer_firstname
        customer_gender
        customer_gmail
        customer_id
        customer_identification_id
        customer_lastname
        customer_password
        customer_phone
        customer_profile
        customer_province
        customer_village
    }
    }

    `,
    update: gql`
     mutation MyMutation($announcement_id: uuid = "", $object: announcement_set_input = {}) {
    update_announcement_by_pk(pk_columns: {announcement_id: $announcement_id}, _set: $object) {
            announcement_id
        }
    }
    `,
    delete: gql`
    mutation MyMutation($report_issue_id: uuid = "") {
    delete_report_issue_by_pk(report_issue_id: $report_issue_id) {
        report_issue_id
    }
    }

    `,
    getAll: gql`
query MyQuery {
  report_issue {
    created_at
    report_issue_customer_id
    report_issue_date
    report_issue_detail
    report_issue_id
    report_issue_image
    report_issue_title
    updated_at
    customer {
      created_at
      customer_district
      customer_firstname
      customer_gender
      customer_gmail
      customer_id
      customer_identification_id
      customer_lastname
      customer_password
      customer_phone
      customer_profile
      customer_province
      customer_village
    }
  }
}


    `
    ,
    getOne: gql`
query MyQuery($report_issue_id: uuid = "") {
  report_issue_by_pk(report_issue_id: $report_issue_id) {
    created_at
    report_issue_customer_id
    report_issue_date
    report_issue_detail
    report_issue_id
    report_issue_image
    updated_at
    report_issue_title
    customer {
      created_at
      customer_district
      customer_firstname
      customer_gender
      customer_gmail
      customer_id
      customer_identification_id
      customer_lastname
      customer_password
      customer_phone
      customer_profile
      customer_province
      customer_village
    }
  }
}

    `,
    countAll: gql`
        {
            student_aggregate {
                aggregate {
                count(columns: student_id)
                }
            }
        }
    `,
    search: gql`
query MyQuery($strText: String = "") {
  report_issue(where: {_or:
    [
      {customer: {customer_firstname: {_ilike: $strText}}},
      {customer: {customer_lastname: {_ilike: $strText}}},
      {report_issue_title: {_ilike: $strText}},
      {report_issue_detail: {_ilike: $strText}},
    ]
  }) {
    created_at
    updated_at
    report_issue_title
    report_issue_image
    report_issue_id
    report_issue_detail
    report_issue_date
    report_issue_customer_id
    customer {
      created_at
      customer_district
      customer_firstname
      customer_gender
      customer_gmail
      customer_id
      customer_identification_id
      customer_lastname
      customer_password
      customer_phone
      customer_profile
      customer_province
      customer_village
    }
  }
}

    `,
}

export default Report_issue;
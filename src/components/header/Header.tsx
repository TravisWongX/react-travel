import logo from '../../assets/logo.svg'
import styles from './Header.module.css'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from '../../redux/language/languageActions'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import { Dispatch } from 'redux'

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language,
    languageList: state.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    },
  };
};

type PropsType = ReturnType<typeof mapStateToProps> & 
  ReturnType<typeof mapDispatchToProps>; 

const HeaderComponent:React.FC<PropsType> = (props) => {
  const navigate = useNavigate()
  const language = props.language 
  const languageList = props.languageList
  const { t } = useTranslation()

  const menuClickHandler = (e) => {
    if (e.key === 'new') {
      props.addLanguage('新语言', 'new_lang')
    } else {
      props.changeLanguage(e.key)
    }
  }

  return (
    <div className={styles['app-header']}>
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l) => (
                  <Menu.Item key={l.code}>{l.name}</Menu.Item>
                ))}
                <Menu.Item key={'new'}>
                  {t('header.add_new_language')}
                </Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          <Button.Group className={styles['button-group']}>
            <Button onClick={() => navigate('/register')}>
              {t('header.register')}
            </Button>
            <Button onClick={() => navigate('/signIn')}>
              {t('header.signin')}
            </Button>
          </Button.Group>
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <img src={logo} alt="logo" className={styles['App-logo']} />
        <span onClick={() => navigate('/')}>
          <Typography.Title level={3} className={styles.title}>
            {t('header.title')}
          </Typography.Title>
        </span>
        <Input.Search
          placeholder={'请输入旅游目的地、主题或关键字'}
          className={styles['search-input']}
        />
      </Layout.Header>
      <Menu mode={'horizontal'} className={styles['main-menu']}>
        <Menu.Item key="1"> {t('header.home_page')} </Menu.Item>
        <Menu.Item key="2"> {t('header.weekend')} </Menu.Item>
        <Menu.Item key="3"> {t('header.group')} </Menu.Item>
        <Menu.Item key="4"> {t('header.backpack')} </Menu.Item>
        <Menu.Item key="5"> {t('header.private')} </Menu.Item>
        <Menu.Item key="6"> {t('header.cruise')} </Menu.Item>
        <Menu.Item key="7"> {t('header.hotel')} </Menu.Item>
        <Menu.Item key="8"> {t('header.local')} </Menu.Item>
        <Menu.Item key="9"> {t('header.theme')} </Menu.Item>
        <Menu.Item key="10"> {t('header.custom')} </Menu.Item>
        <Menu.Item key="11"> {t('header.study')} </Menu.Item>
        <Menu.Item key="12"> {t('header.visa')} </Menu.Item>
        <Menu.Item key="13"> {t('header.enterprise')} </Menu.Item>
        <Menu.Item key="14"> {t('header.high_end')} </Menu.Item>
        <Menu.Item key="15"> {t('header.outdoor')} </Menu.Item>
        <Menu.Item key="16"> {t('header.insurance')} </Menu.Item>
      </Menu>
    </div>
  )
}

export const Header = connect(mapStateToProps,mapDispatchToProps)(HeaderComponent)